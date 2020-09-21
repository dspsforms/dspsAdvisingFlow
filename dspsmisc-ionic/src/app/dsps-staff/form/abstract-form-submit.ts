import { FormGroup, FormControl } from "@angular/forms";
import { SavedForm, VersionDetail } from "../../model/saved-form.model";
import { Subscription, Observable, of } from "rxjs";
import { FormUtil } from "../../model/form.util";
import { Router } from "@angular/router";
import { FormsService } from "./forms.service";
import { LastOperationStatusService } from "./last-operation-status.service";

import { OnInit, OnDestroy } from "@angular/core";
import { SubscriptionUtil } from "../../util/subscription-util";
import { StatusMessage } from "../../model/status-message";
import { AppGlobalsService } from './app-globals.service';
import { EditedForm } from 'src/app/model/edited-form.model';
import { UrlConfig } from 'src/app/model/url-config';
import { UserService } from '../user/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DataTransformService } from './data-transform.service';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { AuthData } from 'src/app/auth/auth-data.model';


// base class for form submits

export class AbstractFormSubmit implements OnInit, OnDestroy {

  public title: string;
  public form: FormGroup;

  public newForm: SavedForm;
  public err: string;
  public errMsg: string;
  public formSaveStatusSub: Subscription;

  public editSaveStatusSub: Subscription;

  public globalsSub: Subscription;

  public grid: boolean;

  // the class extending this should supply this
  public wrappedFormFromDb: WrappedForm;

  public dspsUserListSmallSub: Subscription;

  // dspsUserList is the list of dsps employees -- staff, faculty, admin
  // this list is need for completedBy fields
  public dspsUserListSmall: AuthData[];

  // for child forms
  // using a different name parentFormDataCopy because parentFormData is used an Input() in sub class
  public parentFormDataCopy: any; 
  public isParent: boolean;
  public childFormName: string;

  constructor(
    public formName: string,
    public router: Router,
    public formService: FormsService,
    public authService: AuthService,
    public dataTxformService: DataTransformService,
    public appGlobalsService: AppGlobalsService, 
    public userService: UserService,
    public lastOpStatusService: LastOperationStatusService)
  {

  }

  ngOnInit() {
    this.title = FormUtil.formTitle(this.formName);  // "DSPS Application for Services" etc;
  
    // initial value of grid
    this.grid = this.appGlobalsService.getGrid();

    // subscribe to changes in grid
    this.globalsSub = this.appGlobalsService.getGridValueChangeListener()
      .subscribe(data => {
        this.grid = data.grid;
      });

    this.dspsUserListSmall = this.userService.getDspsUserListSmall();

    if (!this.dspsUserListSmall || this.dspsUserListSmall.length === 0) {

       // subcribe to userList 
      this.dspsUserListSmallSub = this.userService.getDspsUserListSmallListener()
        .subscribe(data => {
          this.dspsUserListSmall = data;
        });
      
      // initiate db call
      this.userService.listDspsUsersSmall();
    }
    
   

  }

  ionViewWillEnter() {
    this.title = FormUtil.formTitle(this.formName);
  }
 
  getUserId() {
    return this.authService.getUserId();
  }

  setAboutToSubmit() {
    this.form['aboutToSubmit'] = true;
  }

  setIsParent(isParent) {
    this.isParent = isParent;
  }
  
   /* for each property in form (and recursively), add {version: 1}
        so if foo: val
        change to foo: [ { data: val, version: 1} ]

        if foo == {...} 
        foo: [ { data: {...}, version: 1 } ]
    */
  
  // modifyValueObj(node) {

  //   const result = {};
  //   if (typeof node === "string" || typeof node === "number" ||
  //     typeof node === "boolean") {

  //   }
  //   Object.keys(node).forEach(field => {
  //     const val = node.get(field);
  //     if (val instanceof Object) {
  //       // recurse down the tree
  //       const children = this.modifyValueObj(val);
  //     } else if (control instanceof FormGroup) {
  //       // recurse down the tree
  //       this.initVal(control, data[field]); 
  //     }
  //   });
    
  // }

  /*

  nextPage: 
    not specified: got to list view
    stayOnPage: stay here
    gotoParent: for child pages, go to parent page
  */
  createForm(nextPage?: 'stayOnPage' | 'gotoParent' | null ) {
    console.log("create ", this.formName, "  ", this.form.value);
    
    const completedByUserId = this.getUserId();

    if (!this.form.valid || !this.form.dirty) {
      return;
    }

    this.setAboutToSubmit(); // so the canDeactivate guard doesn't get in the way

    const now = new Date();
    // form's history
    const formHistoryArr = this.dataTxformService.initDataOnCreate(
      this.form,
      1,
      completedByUserId,
      now,
      'array');
    
    // the last value -- which is will be assigned to the form
    // property has no array
    const formHistoryNoArray = this.dataTxformService.initDataOnCreate(
      this.form,
      1,
      completedByUserId,
      now,
      'noarray');

    const versionDetail = new VersionDetail({
        version: 1,
        date: new Date(),
        completedByUserId: completedByUserId
    });

     
    this.newForm = new SavedForm({
      formName: this.formName,
      user: this.authService.getUserId(),
      formWithLatestHistory: formHistoryNoArray, // was  this.form.value,
      formHistoryArr: formHistoryArr,
      versionDetails: [versionDetail] , // array of VersionDetail
      currentVersion: 1,
      edited: false,
      state: 'current', 
          // reCaptchaV3Token: tokenData.token
          // created: curTime,
          // lastMod: curTime,
      
      isParent: this.isParent,
      childFormName: this.childFormName

    });

    // if this is a parent in a hierarchical form
    // if (this.isParent) {
    //   this.newForm.isParent = true;
    // }
    // if (this.childFormName) {
    //   this.newForm.childFormName = this.childFormName;
    // }
    
    // if this is a child
    if (this.parentFormDataCopy) {
      this.newForm.parentId = this.parentFormDataCopy._id || this.parentFormDataCopy.formKey;
    }

      // first subscribe to the form save status listener. then, ask formService to save the form
    this.formSaveStatusSub = this.formService.getFormSaveStatusListener().subscribe(
        res => {
            if (res.err) {
              // form save failed, show error message, stay on current page
              this.err = res.err;
              this.errMsg = res.message;
            } else {

              // form saved successfully, redirect out

              // set the status message that will be shown in the newForm page
              this.lastOpStatusService.setStatus(StatusMessage.FORM_SUBMIT_SUCCESS);

              // goto /dsps-staff/form/list/:formName
              if (!nextPage) {
                this.router.navigate(['/dsps-staff', 'form', 'list', this.formName]);
              } else if (nextPage === 'stayOnPage') {
                this.router.navigate(['/dsps-staff', 'form', 'view', this.formName, res.formId]);
              } else {
                // go to parent
                if (!this.parentFormDataCopy) {
                  console.error(' no parentFormDataCopy, going to list view');
                  this.router.navigate(['/dsps-staff', 'form', 'list', this.formName]);
                }

                console.log([this.parentFormDataCopy]);

                // does not work
                //  https://stackoverflow.com/questions/52389376/angular-6-how-to-reload-current-page/57157316#57157316
                // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                // this.router.onSameUrlNavigation = 'reload';
                
                // this.router.navigate([
                //   '/dsps-staff', 'form', 'view',
                //   this.parentFormDataCopy.formName,
                //   this.parentFormDataCopy._id
                // ]);
                // this.router.navigateByUrl(
                //   '/dsps-staff/form/view/' + 
                //   this.parentFormDataCopy.formName + '/' + 
                //   this.parentFormDataCopy._id
                // );

                // same page load isn't working as it should. so reload
                // add a junk param
                const junk = new Date().getTime();
                const url = '/dsps-staff/form/view/' + 
                          this.parentFormDataCopy.formName + '/' + 
                            this.parentFormDataCopy._id + '/' + junk;
                
                this.router.navigateByUrl(url);
                
              }
            }
        });

    // ask formService to save the form
    this.formService.saveForm(this.newForm);

  }

  // wrappedFormFromDb has formHistory, versionDetail, etc.
  // nextPage is if a child form is being edited. 
  // go to parentForm with the given name and id
  editForm(formKey: string, nextPage?: { parentFormName: string; parentId: string; jumpTo: string }) {
    console.log("edit ", this.formName, "  ", this.form.value);
    
    if (!this.form.valid) {
      return;
    }

    /*
     _id: string,
      formName?: string,
      user?: string,
      form?: {},
      formHistory?: {},
      versionDetails?: VersionDetail[],
      currentVersion?: number,
      state?: string,
      edited?: boolean, 
      created?: Object,
      lastMod?: Object;
      reCaptchaV3Token?: string;
      */

    // TODO check also that form.value has changed.
    
    this.setAboutToSubmit(); // so the canDeactivate guard doesn't get in the way

    const now = new Date();
    const completedByUserId = this.getUserId();
    const newVersion = this.wrappedFormFromDb.currentVersion + 1;

    // forHistoryArr and formWithLatestHistory need to be updated
    // with values that have changed

    // update form history objects -- in place
    const hasUpdates = this.updateFormHistory(
      this.form,
      newVersion, // new version to use if there is a value change
      completedByUserId, // form completed by this user in this version
      now, // current date
      this.wrappedFormFromDb.formWithLatestHistory, // hopefully, data will get updated in place
      this.wrappedFormFromDb.formHistoryArr // again, testing if updating in place will do the trick
  
    );

    if (!hasUpdates) {
      console.log("form is dirty, but has no upddated values, not saving");
      return;
    }

    const versionDetail = new VersionDetail({
        version: newVersion,
        date: now,
        completedByUserId: completedByUserId
    });

    this.wrappedFormFromDb.versionDetails.push(versionDetail);

    const updatedForm = new EditedForm({
        _id: formKey,
        formName: this.formName,
        user: this.authService.getUserId(),
        formWithLatestHistory: this.wrappedFormFromDb.formWithLatestHistory, // has been updated in place

        formHistoryArr: this.wrappedFormFromDb.formHistoryArr ,   // has been updated in place
        versionDetails: this.wrappedFormFromDb.versionDetails,
        currentVersion: newVersion, 

        state: this.wrappedFormFromDb.state || 'current' , // VERIFY that this is always the case
        edited: true,

        created: this.wrappedFormFromDb.created, 
        lastMod: now,
        
      });

    // first subscribe to the form save status listener. then, ask formService to save the form
    this.editSaveStatusSub = this.formService.getFullFormPatchStatusListener().subscribe(
        res => {
            if (res.err) {
              // form save failed, show error message, stay on current page
              this.err = res.err;
              this.errMsg = res.message;
              console.log(res);
            } else {

              // form saved successfully, redirect out

              // set the status message that will be shown in the newForm page
              this.lastOpStatusService.setStatus(StatusMessage.FORM_SUBMIT_SUCCESS);

              if (!nextPage) {
                // goto /dsps-staff/form/list/:formName
                this.router.navigate(['/dsps-staff', 'form', 'list', this.formName]);
              } else {
                const url = `/dsps-staff/form/view/${nextPage.parentFormName}/${nextPage.parentId}?goto=${nextPage.jumpTo}`;
                this.router.navigateByUrl(url);
                // this.router.navigate(['/dsps-staff', 'form', 'view', nextPage.parentFormName, nextPage.parentId]);
              }
              
            }
        });

      // ask formService to update the form
    this.formService.patchFullForm(updatedForm, this.formName);

    // if this.form.dirty and this.form.valid
  }

  disableForm(formGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.disable();
      } else if (control instanceof FormGroup) {
        // recurse down the tree
        this.disableForm(control); 
      }
    });
  }

  // 7/25/2020: added forCreate: boolean
  // if forCreate is true, we are simply using latestValueHistory for initializing 
  // a new form ("for create").
  initVal(
    formGroup: FormGroup,
    latestValueHistory: { [x: string]: any; },
    fullValueHistory?: { [x: string]: any; },
    forCreate?: boolean) {
    // console.log("formGroup", formGroup);
    // console.log("data" , latestValueHistory);
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (latestValueHistory[field] && latestValueHistory[field].val) {
          control.setValue(latestValueHistory[field].val);
        }

        if (!forCreate) {
          // keep the history data with the control, so they could be used to display the history
          control['latestValueHistory'] = latestValueHistory[field]; 
          control['fullValueHistory'] = fullValueHistory[field];
          
        }
        
      } else if (control instanceof FormGroup) {
        // recurse down the tree
        this.initVal(control, latestValueHistory[field], fullValueHistory[field], forCreate); 
      }
    });
  }

   /*
   Each FormControl has properties from it's history.
   we had set it this way when the form was initialized with data from db
      control['latestValueHistory'] = latestValueHistory[field]; 
      control['fullValueHistory'] = fullValueHistory[field];
  */
  updateFormHistory(
    formGroup: FormGroup,
    newVersion: number,
    userId: string,
    now: Date,
    formWithLatestHistory,
    formHistoryArr

  ): boolean {
    console.log("formGroup before update:", formGroup);
    
    let atLeastOneChange = false;
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl && control.dirty) {
        // if (latestValueHistory[field] && latestValueHistory[field].val) {
        //   control.setValue(latestValueHistory[field].val);
        // }
        // keep the history data with the control, so they could be used to display the history
        // control['latestValueHistory'] = latestValueHistory[field]; 
        // control['fullValueHistory'] = fullValueHistory[field];

        // control['latestValueHistory'] is going to be around during edit, but during testing a new form
        // some controls are added along the way, so it may not be around.
        const prevValue = control['latestValueHistory'] ? control['latestValueHistory'].val : null ;
        if (control.value !== prevValue) {
          atLeastOneChange = true;
          const foo = {
            val: control.value,
            version: newVersion,
            userId: userId,
            date: now
          };
          formWithLatestHistory[field] = foo;

          // in rare cases, e.g, if a new field is added to an existing
          // form, there is no history for that field.
          if (!formHistoryArr[field]) {
            formHistoryArr[field] = [];
          }
          formHistoryArr[field].push(foo);
        }
      } else if (control instanceof FormGroup) {


        // recurse down the tree
        // need to compute updateFormHistory() regardless of prev
        // value of atLeastOneChange. 
        // atLeastOneChange = atLeastOneChange || updateFormHistory()
        // will short circuit if atLeastOneChange is already true.
        const hasRecursiveChange =  this.updateFormHistory(
          control,
          newVersion,
          userId,
          now,
          formWithLatestHistory[field],
          formHistoryArr[field]
        ); 

        atLeastOneChange = atLeastOneChange || hasRecursiveChange;
      }
    });

    console.log("formGroup after update:", formGroup);
    console.log("atLeastOneChange=", atLeastOneChange);

    return atLeastOneChange;

  }

  // spreadSheetFieldNames
  spreadSheetFieldNames(
    formGroup: FormGroup,
    prependStr: string): string[] {
    // console.log("formGroup", formGroup);
    // console.log("data" , latestValueHistory);
    let result = [];
    const prepend = prependStr ? prependStr + "." : '';
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        result.push(prepend + field + ".val");
      } else if (control instanceof FormGroup) {
        // recurse down the tree
        const tree = this.spreadSheetFieldNames(control, prepend  + field); 
        if (tree && tree.length > 0) {
          result = result.concat(tree);
        }
      }
    });

    return result;
  }

  onCancel() {
    // need a guard
    if (this.form.dirty) {
      // TODO ask user to confirm if the form is dirty
    }

    this.router.navigateByUrl(UrlConfig.LIST_FORMS_PRE_ABSOLUTE + this.formName);
  }

  get currentVersion() {
    if (this.wrappedFormFromDb &&
        this.wrappedFormFromDb.currentVersion
    ) {
        return this.wrappedFormFromDb.currentVersion;
    } else {
        return null;
    }
  }

  get lastModified() {

    if (this.wrappedFormFromDb) {
        if (this.wrappedFormFromDb.lastMod) {
            return this.wrappedFormFromDb.lastMod;
        } else if (this.wrappedFormFromDb.created) {
            return this.wrappedFormFromDb.created;
        }
    }
    
    return null;     
  }

  get lastModifiedBy() {
    if (!this.dspsUserListSmall || this.dspsUserListSmall.length == 0) {
        // userList will come over time, over a subscription
        return;
    }
    if (this.wrappedFormFromDb && this.wrappedFormFromDb.user
    ) {
        const lastUserIdWhoEdited = this.wrappedFormFromDb.user;
        const lastUserWhoEdited =
            this.dspsUserListSmall.find(user => user._id === lastUserIdWhoEdited);
        return lastUserWhoEdited.name; // if null, that's ok
    } else {
        return null;
    }

  }

  

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.formSaveStatusSub);
    SubscriptionUtil.unsubscribe(this.editSaveStatusSub);
    SubscriptionUtil.unsubscribe(this.globalsSub);
    SubscriptionUtil.unsubscribe(this.dspsUserListSmallSub);
  }

 
  

}
