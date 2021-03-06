import { FormGroup, FormControl } from "@angular/forms";
import { SavedForm, VersionDetail } from "../../model/saved-form.model";
import { Subscription } from "rxjs";
import { FormUtil, FormName } from "../../model/form.util";
import { Router } from "@angular/router";
import { FormsService } from "./forms.service";
// import { LastOperationStatusService } from "./last-operation-status.service";

import { OnInit, OnDestroy, Inject, OnChanges, SimpleChanges } from "@angular/core";
import { SubscriptionUtil } from "../../util/subscription-util";
import { StatusMessage } from "../../model/status-message";
// import { AppGlobalsService } from './app-globals.service';
import { EditedForm } from 'src/app/model/edited-form.model';
import { UrlConfig } from 'src/app/model/url-config';
import { UserService } from '../user/user.service';
import { AuthService } from 'src/app/auth/auth.service';
// import { DataTransformService } from './data-transform.service';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { AuthData } from 'src/app/auth/auth-data.model';
import { DataTransformService } from './data-transform/data-transform.service';
import { AppGlobalsService } from './app-globals/app-globals.service';
import { LastOperationStatusService } from './last-operation-status/last-operation-status.service';
import { Title } from '@angular/platform-browser';

// base class for form submits

// OnChanges
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

  private prevPageTitle = null;

  constructor(
    public formName: string,
    public router: Router,
    public formService: FormsService,
    public authService: AuthService,
    public dataTxformService: DataTransformService,
    public appGlobalsService: AppGlobalsService,
    public userService: UserService,
    public lastOpStatusService: LastOperationStatusService,
    public titleService: Title)
  {

  }
  // ngOnChanges(changes: SimpleChanges): void {

  //   const tmpPageTitle = this.pageTitle;
  //   if (!tmpPageTitle) { return; }

  //   if (!this.prevPageTitle || this.prevPageTitle !== tmpPageTitle ) {
  //     this.prevPageTitle = tmpPageTitle;
  //     this.titleService.setTitle(this.prevPageTitle);
  //   }
  // }

  // setFormName(formName: string) {
  //   this.formName = formName;
  // }

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


  getUserId() {
    return this.authService.getUserId();
  }

   /* for each property in form (and recursively), add {version: 1}
        so if foo: val
        change to foo: [ { data: val, version: 1} ]

        if foo == {...}
        foo: [ { data: {...}, version: 1 } ]
    */



  // for print, no createForm or editForm
  // disableForm is also not needed, but let it stay

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

  // this is also not needed

  initVal(formGroup, latestValueHistory, fullValueHistory) {
    // console.log("formGroup", formGroup);
    // console.log("data" , latestValueHistory);
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

  // not needed for print

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

  // not needed
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

  // for print, this stuff is needed in bluesheet component, etc. not
  // in common header area. so moved from ionic app's abstract-form-read
  // to abstract-form-submit

  get studentName() {

    let result = null;

    if (this.wrappedFormFromDb && this.wrappedFormFromDb.formWithLatestHistory) {

        if (this.wrappedFormFromDb.formWithLatestHistory['studentLastName']) {
            result = this.wrappedFormFromDb.formWithLatestHistory['studentLastName'].val;
        }

        if (this.wrappedFormFromDb.formWithLatestHistory['studentFirstName']) {
            // add comma if there was a lastname found
            if (result) { result += ", "; }

            result += this.wrappedFormFromDb.formWithLatestHistory['studentFirstName'].val;
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

    if (this.wrappedFormFromDb.formName === FormName.BLUESHEET) {
        // add course, semester, year

        // if there is a student name, if (this.data.formWithLatestHistory
        // is not empty
        if (this.wrappedFormFromDb.formWithLatestHistory['course'] &&
            this.wrappedFormFromDb.formWithLatestHistory['course'].val) {
            result += " / " + this.wrappedFormFromDb.formWithLatestHistory['course'].val;
        }


        if (this.wrappedFormFromDb.formWithLatestHistory['semester'] &&
            this.wrappedFormFromDb.formWithLatestHistory['semester'].val) {
            result += " / " + this.wrappedFormFromDb.formWithLatestHistory['semester'].val;
        }

        if (this.wrappedFormFromDb.formWithLatestHistory['year'] &&
            this.wrappedFormFromDb.formWithLatestHistory['year'].val) {
            result += " / " + this.wrappedFormFromDb.formWithLatestHistory['year'].val;
        }
    }

    return result;
  }

  get formTitle() {
    if (this.wrappedFormFromDb && this.wrappedFormFromDb.formName) {
      return FormUtil.formTitle(this.wrappedFormFromDb.formName);
    } else {
      return null;
    }
  }

  get pageTitle() {

    /*
    formInfo.formTitle
  <span *ngIf="formLabel"> : {{ formLabel }
    */
    let result = this.formTitle;
    if (this.formLabel) {
        result += " : " + this.formLabel;
    };
    return result;
  }



  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.formSaveStatusSub);
    SubscriptionUtil.unsubscribe(this.editSaveStatusSub);
    SubscriptionUtil.unsubscribe(this.globalsSub);
    SubscriptionUtil.unsubscribe(this.dspsUserListSmallSub);
  }

  // only public and protected methods are accessible by subclass
  setWrappedFormFromDb(w: WrappedForm) {
    this.wrappedFormFromDb = w;

    // kludge: update page title
    this.titleService.setTitle(this.pageTitle);

  }

  // only public and protected methods are accessible by subclass
  setIsParent(b) {
    this.isParent = b;
  }


}
