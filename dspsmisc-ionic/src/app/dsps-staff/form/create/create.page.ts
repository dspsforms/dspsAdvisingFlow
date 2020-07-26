import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from '../forms.service';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { UrlConfig } from 'src/app/model/url-config';
import { FormName, FormUtil } from 'src/app/model/form.util';
import { Title } from '@angular/platform-browser';
import { AbstractFormSubmit } from '../abstract-form-submit';
import { FormGroup } from '@angular/forms';
import { IHasChanges } from 'src/app/util/has-changes.interface';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit , OnDestroy, IHasChanges {

  data: WrappedForm;  // if initialized from a different form

  paramSub: Subscription;
  dbSubscription: Subscription = null;

  formName: string;
  formDisplayName: string; // user friendly name for formName

  containedForm: FormGroup;
  
  initializedFromId: string = null; // if form is initialized from another form.
  busy = false;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formsService: FormsService,
    private titleService: Title) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.paramSub = this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('formName')) {
        console.log("no formName for create");
        this.router.navigateByUrl(UrlConfig.DEFAULT_BACK_BUTTON_HREF);
        return;
      }

      this.formName = paramMap.get('formName');
      this.formDisplayName = FormUtil.formTitle(this.formName);

      // remove prev value of initializedFromId. probably not necessary.
      this.initializedFromId = null; 
      this.initializedFromId = paramMap.get("initializedFromId");

      this.titleService.setTitle(this.formDisplayName);

      //
      if (this.initializedFromId) {
        this.dbSubscription  = this.formsService.getCurrentFormUpdatedListener().subscribe(formData => {
          this.data = formData;
          this.busy = false;
        }); 
      }

      if (this.initializedFromId) {
        this.data = new WrappedForm({});
        this.busy = true;
        this.formsService.getFormData2(
            this.formName,
            this.initializedFromId,
            false // not a student user
        );
      }

    });
  }

  ionViewWillExit() {
    SubscriptionUtil.unsubscribe(this.paramSub);
    SubscriptionUtil.unsubscribe(this.dbSubscription);
  }

  ngOnDestroy() {
   
    // does not hurt
    SubscriptionUtil.unsubscribe(this.paramSub);
    SubscriptionUtil.unsubscribe(this.dbSubscription);
  }

  receiveContainedForm(event) {
    console.log("contained form", event);
    this.containedForm = event;
  }

  hasChanges() {
    // if this form is about to be submitted, don't return true
    if (this.containedForm && this.containedForm.dirty && !this.containedForm['aboutToSubmit']) {
      return true;
    } else {
      return false;
    }
  }
}
