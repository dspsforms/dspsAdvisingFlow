import { OnInit, OnDestroy } from '@angular/core';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { Config } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from './forms.service';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { FormUtil, FormName } from '../../model/form.util';
import { Subscription } from 'rxjs';
import { UserService } from '../user/user.service';
import { AuthData } from 'src/app/auth/auth-data.model';
import { Title } from '@angular/platform-browser';
import { chdir } from 'process';



export class AbstractFormRead implements OnInit, OnDestroy {

    // base class to read form data for view and edit

    paramSubscription : Subscription;
    dbSubscription: Subscription;
    
    chilSignatureSubscription: Subscription;

    busy = false;
    showJson = false;

    config: Config;

    formInfo = { formName: '', formTitle: '', _id: ''};

    data: WrappedForm;

    private isStudentUser = false; // set this to true for students viewing their own form

    constructor(
        public route: ActivatedRoute,
        public formService: FormsService,
        public titleService: Title) { }

    setStudentUser(b: boolean) {
        this.isStudentUser = b;
    }
  
    ngOnInit() {
    }

    //  multiple this.busy= true etc 
    // are probably not needed. it's there because at one point
    // part of this was in ngOnInit and part in ionViewWillEnter
    // but it doesn't seem to hurt, so we are going to keep it here.
    ionViewWillEnter() {

        this.data = new WrappedForm({});
    
        this.paramSubscription = this.route.params.subscribe(
            params => {
              console.log("params", params);
      
              this.formInfo.formName = params['formName'];
              this.formInfo.formTitle = FormUtil.formTitle(this.formInfo.formName);
              this.formInfo._id = params['formId'];
      
              this.data.formKey = params['formId'];
              console.log("formInfo", this.formInfo);
      
            });
        
        this.busy = true;

        this.chilSignatureSubscription = this.formService.getChildSignatureFetchStatusListener()
            .subscribe(childSigStatus => {
                if (!childSigStatus) { 
                    // no op 
                }  else if (childSigStatus.err) {
                    // TODO handle error
                } else if (childSigStatus.signatures && childSigStatus.signatures.length > 0) {
                    // TODO handle signatures
                    // match the data.children's ids with ids in signatures
                    console.log("retriedved child sigs", childSigStatus.signatures);

                    childSigStatus.signatures.forEach(sig => {
                        // find the child form with matching sig.formId
                        const child = this.data.children.find(child => child._id === sig.formId);
                        if (child) {
                            child.signatures ? child.signatures.push(sig) : child.signatures = [sig];
                            console.log(child);
                        } else {
                            console.error("child not found for sig=", sig);
                        }
                    })
                }
                
            });
          
        this.dbSubscription  = this.formService.getCurrentFormUpdatedListener().subscribe(formData => {
            this.data = formData;
            this.busy = false;
            this.titleService.setTitle(this.title);

            // schedule fetch of child form signatures
            if (this.data && this.data.children && this.data.children.length > 0) {
                this.formService.getSignatures(this.data.children, this.isStudentUser);
            }
            
        }); 

    
        this.data = new WrappedForm({});
        this.busy = true;
        this.formService.getFormData2(
            this.formInfo.formName,
            this.formInfo._id,
            this.isStudentUser
        );

        

    
    }
      
    ionViewWillExit() {
      
        SubscriptionUtil.unsubscribe(this.paramSubscription);
        SubscriptionUtil.unsubscribe(this.dbSubscription);

        // no need to destroy the userList here. that will hardly ever change
    
    }
      
    // ngOnInit and ngOnDestroy are not useful for an Ionic 5 page
    // because of caching. ionViewWillEnter and ionViewWillExit are
    // serving the original purpose of ngOnInit and ngOnDestroy
      
    ngOnDestroy() {
      
        SubscriptionUtil.unsubscribe(this.paramSubscription);
        SubscriptionUtil.unsubscribe(this.dbSubscription);
        SubscriptionUtil.unsubscribe(this.chilSignatureSubscription);
     
      
    }

    get studentName() {

        let result = null;

        if (this.data && this.data.formWithLatestHistory) {
                
            if (this.data.formWithLatestHistory['studentLastName']) {
                result = this.data.formWithLatestHistory['studentLastName'].val;
            }

            if (this.data.formWithLatestHistory['studentFirstName']) {
                // add comma if there was a lastname found
                if (result) { result += ", "; }
                
                result += this.data.formWithLatestHistory['studentFirstName'].val;
            }

            
        }
        
        return result;

    }

    get formLabel() {

        // this depends on type of form

        let result = this.studentName;

        // during create, there is no student info
        if (!result) {
            return null;
        }

        // there is a student name

        if (this.formInfo.formName === FormName.BLUESHEET) {
            // add course, semester, year

            // if there is a student name, if (this.data.formWithLatestHistory
            // is not empty
            if (this.data.formWithLatestHistory['course'] &&
                this.data.formWithLatestHistory['course'].val) {
                result += " / " + this.data.formWithLatestHistory['course'].val;
            }


            if (this.data.formWithLatestHistory['semester'] &&
                this.data.formWithLatestHistory['semester'].val) {
                result += " / " + this.data.formWithLatestHistory['semester'].val;
            }

            if (this.data.formWithLatestHistory['year'] &&
                this.data.formWithLatestHistory['year'].val) {
                result += " / " + this.data.formWithLatestHistory['year'].val;
            }
        }

        return result;
    }

    get title() {

        /*
        formInfo.formTitle
      <span *ngIf="formLabel"> : {{ formLabel }
        */
        let result = this.formInfo.formTitle;
        if (this.formLabel) {
            result += " : " + this.formLabel;
        };
        return result;
    }

    

}
