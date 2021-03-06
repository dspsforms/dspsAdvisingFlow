import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { WrappedForm } from '../../model/wrapped-form.model';
import { FormName, FormUtil } from '../../model/form.util';
import { environment } from '../../../environments/environment';
import { SavedForm } from '../../model/saved-form.model';
import { EditedForm } from 'src/app/model/edited-form.model';
import { Signature } from 'src/app/model/signature.model';
import { SignatureStatus, SignatureArrayStatus } from 'src/app/model/sig-status.model';






@Injectable({
  providedIn: 'root'
})
export class FormsService implements OnInit {

  // key == formName. value = WrappedForm[]
  formsMap = {};

  // key == formName, value == Subject
  formsUpdatedMap = {};

   // cached search results. key == search term. value = searchResult
   cachedSearchMap = {};

  private currentForm: WrappedForm;
  private currentFormUpdated = new Subject<WrappedForm>();

  // for when an agreement is retrieved
  private agreementRetrieved = new Subject<WrappedForm>();

  private formListTypes = []; // collections of forms in the database
  private formListUpdated = new Subject<string[]>();

  private formSaveStatus = new Subject<{ formId: string, message: string, err?: string } > ();

  private formPatchStatus = new Subject<{ data: WrappedForm, message: string, err?: string }>();
  
  private fullFormPatchStatus = new Subject<{ data: WrappedForm, message: string, err?: string }>();
  
  private signatureSaveStatus = new Subject<SignatureStatus>();
  
  private studentRecordsStatus = new Subject<{ listOfForms?: {}, message?: string, err?: string }>();
  
  private studentFormStatus = new Subject<{ form?: WrappedForm, message?: string, err?: string }>();
  
  private childSignatureFetchStatus = new Subject<SignatureArrayStatus>();

  private formsFromSearch = new Subject();

  constructor(private http: HttpClient) {
    // initiaze formsUpdateMap. each entry is a key/value pair
    // key is formNmae. value is a Subject.
    const formNames: string[] = FormName.formNames;
    for (const form of formNames) {
      this.formsUpdatedMap[form] = new Subject<{ items: WrappedForm[]; maxItems: number }>();
    }

  }

  ngOnInit() {


  }

  getCurrentFormUpdatedListener() {
    return this.currentFormUpdated.asObservable();
  }

  getAgreementRetrievedListener() {
    return this.agreementRetrieved.asObservable();
  }

  getFormListUpdatedListener() {
    return this.formListUpdated.asObservable();
  }

  // each formName has a list of forms.
  // return an observable for such a list.
  getFormUpdatedListener(formName: string) {
    const subject: Subject<{ items: WrappedForm[]; maxItems: number }> = this.formsUpdatedMap[formName];
    if (subject) {
      return subject.asObservable();
    } else {
      return null;
    }
  }

  getFormSaveStatusListener() {
    return this.formSaveStatus.asObservable();
  }

  getFormPatchStatusListener() {
    return this.formPatchStatus.asObservable();
  }

  getFullFormPatchStatusListener() {
    return this.fullFormPatchStatus.asObservable();
  }

  getSignatureSaveStatusListener() {
    return this.signatureSaveStatus.asObservable();
  }

  getStudentRecordsStatusListener() {
    return this.studentRecordsStatus.asObservable();
  }

  getStudentFormStatusListener() {
    return this.studentFormStatus.asObservable();
  }

  getChildSignatureFetchStatusListener() {
    return this.childSignatureFetchStatus.asObservable();
  }

  getFormsFromSearchListener() {
    return this.formsFromSearch.asObservable();
  }

  // /api/form/:formName/:_id
  getFormData2(formName: string, _id: string, isStudentUser: boolean) {

    console.log("no cached form, fetching from server");
    let url;
    
    if (!isStudentUser) {
      url = environment.server + '/api/form/' + formName + "/" + _id;
    } else {
      url = environment.server + '/api/ownform/' + formName + "/" + _id;
    }
    
    this.getFormData(url);

  }

  getSignatures(children: [WrappedForm], isStudentUser: boolean) {
    let url;
    
    if (!isStudentUser) {
      url = environment.server + '/api/form/signatures';
    } else {
      url = environment.server + '/api/ownform/signatures';
    }
    
    // use a post instead of a get
    const idArr = children.filter(child => {
      return (child.studentSigStatus !== 'pending');
    }).map(child => child._id);
    console.log("idArr of children whose signature is NOT pending", idArr);

    if (idArr && idArr.length > 0) {
      this.http
        .post<{ message: string, signatures?: [Signature], err?: string }>(url, { idArr: idArr } )
        .subscribe( response => {
          console.log(response);
          this.childSignatureFetchStatus.next({ message: response.message, signatures: response.signatures });
        },
        err => {
          console.log(err);
          this.childSignatureFetchStatus.next({ message: 'an error occured',  err: err });
      });

    }
   

  }

  listFormTypes() {
    const url = environment.server + '/api/form/list';
    console.log("fetching url=", url);
    this.http.get<{ message: string; collections: any[] }>(url).subscribe(msgData => {
      console.log(msgData);


      // msgData.collections has the collection names. each is a plural

      this.formListTypes = msgData.collections.map(collectionName => {

        // collection name is in plural format
        const formName = FormUtil.collection2FormName(collectionName);
        return formName;

      }).filter(formName => {
        if (formName) {
          return true;
        } else {
          return false;
        }
      });

      // let those listening on it know
      this.formListUpdated.next([...this.formListTypes]);

    }) ;
  }

  // /api/form/:formName
  listForms2(formName: string, state: string, itemsPerPage: number, currentPage: number) {

    // verify formName
    if (! FormName.formNames.includes(formName)) {
      console.log("listForms2, unknown formName ", formName);
      return;
    }

    const queryParams = `?state=${state}&pagesize=${itemsPerPage}&page=${currentPage}`;

    // fetch forms from server. TODO add (limit, offset) -- pagination
    const url = environment.server + '/api/form/' + formName + queryParams;
    console.log("fetching url=", url);
    this.http.get<{ message: string; listOfForms: WrappedForm[]; maxItems: number}>(url)
      .subscribe(msgFormData => {
        console.log(msgFormData);

        // convert each elem to (id, elem) and store in a map
        const id2FormData = {};
        msgFormData.listOfForms.map(elem => {
          const wrappedForm = elem as WrappedForm;
          id2FormData[wrappedForm._id ] = wrappedForm;

        });

        // save the list in formsMap
        this.formsMap[formName] = id2FormData; // msgFormData.listOfForms;

        // let anyone listening know that the data has been updated
        const subject: Subject<{ items: WrappedForm[]; maxItems: number } > = this.formsUpdatedMap[formName];
        if (subject) {
          // send a clone of the array so receiver cannot change our copy
          subject.next({ items: [...msgFormData.listOfForms], maxItems: msgFormData.maxItems } );
        } else {
          console.log("no Subject found to send out an update event for formName ", formName);
        }
      });
  }

  // get cached result if available
  getSearchResult(searchTerm: string) {
    // verify searchTerm
    if (! searchTerm  || searchTerm === '*') {
      console.log("getSearchResult, illegal searchTerm ", searchTerm);
      return;
    }

    return this.cachedSearchMap[searchTerm];
  }

  // /api/search/form with searchTerm in body of post
  // searchTerm is on student fullName. But if it starts with G0, then search on collegeId
  search(searchTerm: string) {

    // verify searchTerm
    if (! searchTerm  || searchTerm === '*') {
      console.log("search, illegal searchTerm ", searchTerm);
      return;
    }

    // fetch forms matching name of a student
    const url = environment.server + '/api/search/form';
    console.log("fetching url=", url);
    this.http.post<{ message: string; listOfForms: {} }>(url, {searchTerm: searchTerm })
      .subscribe(msgFormData => {

        /*
        message: ... ,
        listOfForms: {
          intakeForm: [],
          etc
        }
        */
        console.log(msgFormData);

        if (msgFormData.listOfForms) {
          this.cachedSearchMap[searchTerm] = msgFormData.listOfForms;
        }


        // let anyone listening know that the data has been updated
        this.formsFromSearch.next( msgFormData);
      });
  }

  saveForm(formData: SavedForm, agreementForForm?: string) {
    // url is like this: "http://localhost:3000/api/form/intakeForm"
    // or http://localhost:3000/api/form/agreement/intakeForm
    // agreements may change over time, but that is not currently a requirement.
    // if we need to support it, the db structure will need to change. the client side path
    // could potentially remain the same
    let url;
    if (!agreementForForm) {
      url = environment.server + "/api/form/" + formData.formName;
    } else {
      url = environment.server + "/api/form/agreement/" + agreementForForm;
    }
    console.log("post to url=", url, ' agreementForForm=', agreementForForm);
    this.http
      .post < { formId: string, message: string, err?: string } > (url, formData)
      .subscribe( response => {
         console.log(response);
         this.formSaveStatus.next({ formId: response.formId, message: response.message });
         // this.router.navigate([nextUrl || "/"]);
      },
      err => {
        console.log(err);
        this.formSaveStatus.next({ formId: null, message: 'an error occured',  err: err });
    });
  }

  patchForm(formData: WrappedForm, formName: string) {


    const url = environment.server + "/api/form/" + formName ;

    this.http
      .patch < { data: any, message: string, err?: string } > (url, formData)
      .subscribe( response => {
         console.log(response);
         this.formPatchStatus.next({ data: response.data, message: response.message });
         // this.router.navigate([nextUrl || "/"]);
      },
      err => {
        console.log(err);
        this.formPatchStatus.next({ data: null, message: 'an error occured',  err: err });
    });
  }

  patchFullForm(formData: EditedForm, formName: string) {


    const url = environment.server + "/api/form/full/" + formName ;

    this.http
      .patch < { data: any, message: string, err?: string } > (url, formData)
      .subscribe( response => {
         console.log(response);
         this.fullFormPatchStatus.next({ data: response.data, message: response.message });
         // this.router.navigate([nextUrl || "/"]);
      },
      err => {
        console.log(err);
        this.fullFormPatchStatus.next({ data: null, message: 'an error occured',  err: err });
    });
  }

  // /api/form/agreement/:formName
  getAgreement(formName: string) {

    const url = environment.server + '/api/form/agreement/' + formName;
    console.log("fetching url=", url);
    this.getFormData(url, true);
  }

  private getFormData(url: string, isAgreement?: boolean) {
    console.log("fetching url=", url);
    this.http.get<{
      message: string;
      formData: WrappedForm;
      signatures?: [Signature];
      children?: [WrappedForm]
    }>(url)
      .subscribe(msgFormData => {
        console.log(msgFormData);

        // signatures is coming as a separate field. merge it with formData
        if (msgFormData.signatures && msgFormData.formData) {
          msgFormData.formData.signatures = msgFormData.signatures;
        }
        // children are also coming as a separate field
        if (msgFormData.children && msgFormData.formData) {
          msgFormData.formData.children = msgFormData.children;
        }

        this.currentForm = msgFormData.formData;
       
        // send out an event to those listening for change in currentForm
        if (!isAgreement) {
          this.currentFormUpdated.next(this.currentForm);
        } else {
          this.agreementRetrieved.next(this.currentForm);
        }

      });
  }

  signIt(signatureData: Signature) {
 
    const url = environment.server + "/api/signform/";
  
    this.http
      .post (url, signatureData)
      .subscribe( response => {
         console.log(response);
         this.signatureSaveStatus.next(response as SignatureStatus);
      },
      err => {
        console.log(err);
        this.signatureSaveStatus.next({ signature: null, message: 'an error occured',  err: err });
    });
  }

  listFormsForStudent(sigStatus: string) {
    let url = environment.server + '/api/ownform/list';
    if (sigStatus) {
      // sigStatus can be 'pending' or 'signed'
      url += "/" + sigStatus;
    }

    console.log("fetching url=", url);
    this.http.get<{ message?: string; listOfForms?: {}; err?: string}>(url).subscribe(msgData => {
      console.log(msgData);

      // let those listening on it know
      this.studentRecordsStatus.next(msgData);

    }) ;
  }

  // get "/api/ownform/getaform/:formName/:_id" 

  getStudentForm(formName, formId) {

    const url = environment.server + `/api/ownform/getaform/${formName}/${formId}`;
    console.log("fetching url=", url);

    /*
    message: string, formData: WrappedForm, signatures: [Signature], err: string
    */
    this.http.get<{
      message?: string;
      formData?: WrappedForm;
      signatures?: [Signature];
      children?: [WrappedForm]
      err?: string
    }>(url).subscribe(msgData => {
      console.log(msgData);

      if (msgData.formData && msgData.signatures) {
        msgData.formData.signatures = msgData.signatures;
      }

      if (msgData.formData && msgData.children) {
        msgData.formData.children = msgData.children;
      }

      // let those listening on it know
      this.studentFormStatus.next(msgData);

    }) ;

  }
}
