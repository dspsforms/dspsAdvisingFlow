import { FormGroup, FormControl } from "@angular/forms";
import { SavedForm, VersionDetail } from "../../model/saved-form.model";
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
import { UrlConfig } from 'src/app/model/url-config';
import { UserService } from '../user/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DataTransformService } from './data-transform.service';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

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

  constructor(
    public formName: string,
    public router: Router,
    public formService: FormsService,
    public authService: AuthService,
    public dataTxformService: DataTransformService,
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
 
  getUserId() {
    return this.authService.getUserId();
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

  createForm() {
    console.log("create ", this.formName, "  ", this.form.value);
    
    const completedByUserId = this.getUserId();

    if (!this.form.valid || !this.form.dirty) {
      return;
    }

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
      state: 'current'
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
    this.formService.saveForm(this.newForm);

  }

  // wrappedFormFromDb has formHistory, versionDetail, etc.
  editForm(formKey: string) {
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

    if (this.form.dirty) {
      this.newForm = new EditedForm({
        _id: formKey,
        formName: this.formName,
        user: this.authService.getUserId(),
        formWithLatestHistory: this.form.value, // TODO

        formHistoryArr: {} ,  // TODO 
        versionDetails: [], // TODO
        currentVersion: 2, // TODO

        state: 'current' , // VERIFY that this is always the case
        edited: true,

        created: null, // TODO  
        lastMod: new Date(),
        
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
      this.formService.patchFullForm(this.newForm, this.formName);

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

  initVal(formGroup, latestValueHistory, fullValueHistory) {
    console.log("formGroup", formGroup);
    console.log("data" , latestValueHistory);
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (latestValueHistory[field] && latestValueHistory[field].val) {
          control.setValue(latestValueHistory[field].val);
        }
        // keep the history data with the control, so they could be used to display the history
        control['latestValueHistory'] = latestValueHistory[field]; 
        control['fullValueHistory'] = fullValueHistory[field];
      } else if (control instanceof FormGroup) {
        // recurse down the tree
        this.initVal(control, latestValueHistory[field], fullValueHistory[field]); 
      }
    });
  }

  onCancel() {
    // need a guard
    if (this.form.dirty) {
      // TODO ask user to confirm if the form is dirty
    }

    this.router.navigateByUrl(UrlConfig.LIST_FORMS_PRE_ABSOLUTE + this.formName);
  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.formSaveStatusSub);
    SubscriptionUtil.unsubscribe(this.editSaveStatusSub);
    SubscriptionUtil.unsubscribe(this.globalsSub);
  }

  

}
