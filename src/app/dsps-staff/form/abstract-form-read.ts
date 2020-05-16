import { OnInit, OnDestroy } from '@angular/core';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { Config } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from './forms.service';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { FormUtil } from '../../model/form.util';
import { Subscription } from 'rxjs';



export class AbstractFormRead implements OnInit, OnDestroy {

    // base class to read form data for view and edit

    paramSubscription : Subscription;
    dbSubscription : Subscription;

    busy = false;
    showJson = false;

    config: Config;

    formInfo = { formName: '', formTitle: '', _id: ''};

    data: WrappedForm;
    

    constructor(
        public route: ActivatedRoute,
        public formService: FormsService) { }

  
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
          
        this.dbSubscription  = this.formService.getCurrentFormUpdatedListener().subscribe(formData => {
              this.data = formData;
              this.busy = false;
        });   

    
        this.data = new WrappedForm({});
        this.busy = true;
        this.formService.getFormData2(this.formInfo.formName, this.formInfo._id);
    
    }
      
    ionViewWillExit() {
      
        SubscriptionUtil.unsubscribe(this.paramSubscription);
        SubscriptionUtil.unsubscribe(this.dbSubscription);
    
    }
      
    // ngOnInit and ngOnDestroy are not useful for an Ionic 5 page
    // because of caching. ionViewWillEnter and ionViewWillExit are
    // serving the original purpose of ngOnInit and ngOnDestroy
      
    ngOnDestroy() {
      
          SubscriptionUtil.unsubscribe(this.paramSubscription);
          SubscriptionUtil.unsubscribe(this.dbSubscription);
      
    }

}
