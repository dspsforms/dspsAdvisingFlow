import { Component, OnInit, OnDestroy } from '@angular/core';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { Config } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from '../forms.service';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { FormUtil } from 'src/app/model/form.util';


@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit, OnDestroy {

  paramSubscription;
  dbSubscription;

  busy = false;
  showJson = false;

  config: Config;

  formInfo = { formName: '', formTitle: '', _id: ''};

  data: WrappedForm;

  constructor(
    private route: ActivatedRoute,
    private formService: FormsService) { }

  ngOnInit() {

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

  }

  ionViewWillEnter() {

    this.data = new WrappedForm({});
    this.busy = true;
    this.formService.getFormData2(this.formInfo.formName, this.formInfo._id);

  }
  
  
  
  ngOnDestroy() {
  
      SubscriptionUtil.unsubscribe(this.paramSubscription);
      SubscriptionUtil.unsubscribe(this.dbSubscription);
  
  }
  

}
