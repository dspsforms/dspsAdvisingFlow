import { FormGroup } from "@angular/forms";
import { SavedForm } from "../../model/saved-form.model";
import { Subscription } from "rxjs";
import { FormUtil } from "../../model/form.util";
import { Router } from "@angular/router";
import { FormsService } from "./forms.service";
import { LastOperationStatusService } from "./last-operation-status.service";

import { OnInit, OnDestroy } from "@angular/core";
import { SubscriptionUtil } from "../../util/subscription-util";
import { StatusMessage } from "../../model/status-message";
import { AppGlobalsService } from './app-globals.service';

// base class for form submits

export class AbstractFormSubmit implements OnInit, OnDestroy {

  public title: string;
  public form: FormGroup;

  public savedForm: SavedForm;
  public err: string;
  public errMsg: string;
  public formSaveStatusSub: Subscription;

  public globalsSub: Subscription;

  public grid: boolean;

  constructor(
    public formName: string,
    public router: Router,
    public formService: FormsService,
    public appGlobalsService: AppGlobalsService, 
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
  }

  ionViewWillEnter() {
    this.title = FormUtil.formTitle(this.formName);
  }

  createOrEditForm() {
    console.log("createOrEditForm ", this.formName, "  ", this.form.value);
    
    if (!this.form.valid) {
      return;
    }

    if (this.form.dirty) {
      this.savedForm = new SavedForm({
          formName: this.formName,
          user: 'nobody',
          form: this.form.value,
          edited: false,
          // reCaptchaV3Token: tokenData.token
          // created: curTime,
          // lastMod: curTime,

      });

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
              this.router.navigate(['/dsps-staff', 'form', 'list', this.formName]);
            }
        });

      // ask formService to save the form
      this.formService.saveForm(this.savedForm);

    } // if this.form.dirty and this.form.valid
  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.formSaveStatusSub);
    SubscriptionUtil.unsubscribe(this.globalsSub);
  }

}
