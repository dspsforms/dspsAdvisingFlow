import { FormGroup, FormControl } from "@angular/forms";
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
import { EditedForm } from 'src/app/model/edited-form.model';

// base class for form submits

export class AbstractFormSubmit implements OnInit, OnDestroy {

  public title: string;
  public form: FormGroup;

  public editedForm: SavedForm;
  public err: string;
  public errMsg: string;
  public formSaveStatusSub: Subscription;

  public editSaveStatusSub: Subscription;

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

  

  createForm() {
    console.log("create ", this.formName, "  ", this.form.value);
    
    if (!this.form.valid) {
      return;
    }

    if (this.form.dirty) {
      this.editedForm = new SavedForm({
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
      this.formService.saveForm(this.editedForm);

    } // if this.form.dirty and this.form.valid
  }

  editForm(formKey) {
    console.log("edit ", this.formName, "  ", this.form.value);
    
    if (!this.form.valid) {
      return;
    }

    /*
    _id: string,
      state?: string,
      form?: any,
      formName?: string,
      edited?: boolean,
      user?: string
      */

    if (this.form.dirty) {
      this.editedForm = new EditedForm({
        _id: formKey,
        form: this.form.value,
        formName: this.formName,
        edited: true,
        user: 'nobody'

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

              // goto /dsps-staff/form/list/:formName
              this.router.navigate(['/dsps-staff', 'form', 'list', this.formName]);
            }
        });

      // ask formService to update the form
      this.formService.patchFullForm(this.editedForm, this.formName);

    } // if this.form.dirty and this.form.valid
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

  initVal(formGroup, data) {
    console.log("formGroup", formGroup);
    console.log("data" , data);
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.setValue(data[field]);
      } else if (control instanceof FormGroup) {
        // recurse down the tree
        this.initVal(control, data[field]); 
      }
    });
  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.formSaveStatusSub);
    SubscriptionUtil.unsubscribe(this.editSaveStatusSub);
    SubscriptionUtil.unsubscribe(this.globalsSub);
  }

}
