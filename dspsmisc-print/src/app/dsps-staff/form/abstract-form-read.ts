import { OnInit, OnDestroy } from '@angular/core';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from './forms.service';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { FormUtil, FormName } from '../../model/form.util';
import { Subscription } from 'rxjs';
import { Config } from 'src/app/model/config';
import { AuthPrintService } from 'src/app/auth/auth-print.service';




export class AbstractFormRead implements OnInit, OnDestroy {

    // base class to read form data for view and edit

  paramSubscription: Subscription;
  dbSubscription: Subscription;
  authSub: Subscription;

    busy = false;
    showJson = false;

    config: Config;

    formInfo = { formName: '', formTitle: '', _id: ''};

    data: WrappedForm;

  noLoginInfo = true;
  loginError = false;;

    // wait for login to finish
    timedFunction;
    count = 0;
    token = null;

    private isStudentUser = false; // set this to true for students viewing their own form

    constructor(
      public route: ActivatedRoute,
      public formService: FormsService,
      public authPrintService: AuthPrintService) { }

    setStudentUser(b: boolean) {
        this.isStudentUser = b;
    }

    ngOnInit() {

      this.data = new WrappedForm({});

      this.dbSubscription  = this.formService.getCurrentFormUpdatedListener().subscribe(formData => {
        this.data = formData;
        this.busy = false;
      });

      this.paramSubscription = this.route.params.subscribe(
        params => {
          console.log("params", params);

          this.formInfo.formName = params['formName'];
          this.formInfo.formTitle = FormUtil.formTitle(this.formInfo.formName);
          this.formInfo._id = params['formId'];

          this.data.formKey = params['formId'];
          console.log("formInfo", this.formInfo);

          this.data = new WrappedForm({});
          this.busy = true;
          this.token = null;
          this.count = 0;

          this.token = this.authPrintService.getToken();

          if (this.token) {
            console.log("token found without subscription, sending form request");
            this.noLoginInfo = false;
            this.formService.getFormData2(
              this.formInfo.formName,
              this.formInfo._id,
              this.isStudentUser
            );
          } else {
            // subscribe to token
            this.authSub = this.authPrintService.getAuthStatusListener().subscribe(data => {
              if (data && data.token) {
                this.noLoginInfo = false;
                console.log("token found with subscription, sending form request");
                this.formService.getFormData2(
                  this.formInfo.formName,
                  this.formInfo._id,
                  this.isStudentUser
                );
              } else {
                this.loginError = true;
                console.log("no token found in auth data subscription");
              }
            });
          }


        });

    } // ngOnInit

  // checkLogin() {
  //   if (!this.authPrintService) {
  //     this.token = null;
  //     // clearInterval(this.timedFunction);
  //     return;
  //   }
  //   this.token = this.authPrintService.getToken();
  //   if (this.token) {
  //       // user is logged in
  //       clearInterval(this.timedFunction);
  //   }

  //   if (this.count++ > 60) {
  //       console.log("taking too long, aborting");
  //       clearInterval(this.timedFunction);
  //   }

  // }

  junk() {

     /*
          if token is available, send a form request.
          else subcribe to token, and when available, send form request
          */

         while (this.count++ < 60 && !this.token)
         {
           setTimeout(() => {

             this.token = this.authPrintService.getToken();
             // this.count++;
             console.log("token inside timeout", this.token);

           }, 100);
         }

         // this.timedFunction = setInterval(() => {

         //     // if (!this.authPrintService) {
         //     //   this.token = null;
         //     //   clearInterval(this.timedFunction);
         //     // }
         //     this.token = this.authPrintService.getToken();
         //     if (this.token) {
         //         // user is logged in
         //         clearInterval(this.timedFunction);
         //     }

         //     if (this.count++ > 60) {
         //         console.log("taking too long, aborting");
         //         clearInterval(this.timedFunction);
         //     }
         // }, 100);

         if (!this.token) {
           console.log("no token, user likely not logged in");
           return;
         }
         console.error("user is logged on, sending form request to server");

         this.formService.getFormData2(
             this.formInfo.formName,
             this.formInfo._id,
             this.isStudentUser
         );


  }

    ngOnDestroy() {

      SubscriptionUtil.unsubscribe(this.paramSubscription);
      SubscriptionUtil.unsubscribe(this.dbSubscription);
      SubscriptionUtil.unsubscribe(this.authSub);
    }

  // for print, this stuff is needed in bluesheet component, etc. not
  // in common header area. so moved to abstract-form-submit

  //   get studentName() {

  //     let result = null;

  //     if (this.data && this.data.formWithLatestHistory) {

  //         if (this.data.formWithLatestHistory['studentLastName']) {
  //             result = this.data.formWithLatestHistory['studentLastName'].val;
  //         }

  //         if (this.data.formWithLatestHistory['studentFirstName']) {
  //             // add comma if there was a lastname found
  //             if (result) { result += ", "; }

  //             result += this.data.formWithLatestHistory['studentFirstName'].val;
  //         }


  //     }

  //     return result;

  // }

  // get formLabel() {

  //     // this depends on type of form

  //     let result = this.studentName;

  //     // during create, there is no student info
  //     if (!result) {
  //         return null;
  //     }

  //     // there is a student name

  //     if (this.formInfo.formName === FormName.BLUESHEET) {
  //         // add course, semester, year

  //         // if there is a student name, if (this.data.formWithLatestHistory
  //         // is not empty
  //         if (this.data.formWithLatestHistory['course'] &&
  //             this.data.formWithLatestHistory['course'].val) {
  //             result += " / " + this.data.formWithLatestHistory['course'].val;
  //         }


  //         if (this.data.formWithLatestHistory['semester'] &&
  //             this.data.formWithLatestHistory['semester'].val) {
  //             result += " / " + this.data.formWithLatestHistory['semester'].val;
  //         }

  //         if (this.data.formWithLatestHistory['year'] &&
  //             this.data.formWithLatestHistory['year'].val) {
  //             result += " / " + this.data.formWithLatestHistory['year'].val;
  //         }
  //     }

  //     return result;
  // }



}
