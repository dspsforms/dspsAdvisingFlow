import { OnInit, OnDestroy } from '@angular/core';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from './forms.service';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { FormUtil, FormName } from '../../model/form.util';
import { Subscription } from 'rxjs';
import { Config } from 'src/app/model/config';
import { AuthPrintService } from 'src/app/auth/auth-print.service';
import { AuthData } from 'src/app/auth/auth-data.model';
import { environment } from 'src/environments/environment';




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

        if (environment.sameSite) {
          this.handleSameServerSite();
        } else {
          this.handleDifferentServerSite();
        }


      });

  } // ngOnInit

  handleSameServerSite() {

    // for same server, no need to check localstorage. user must be
    // logged in to get here
    console.log("print-app: token=", this.authPrintService.getToken());
    console.log("print-app: same server, sending form request");
    this.noLoginInfo = false;
    this.setStudentUser(this.authPrintService.getUser()); // will set isStudentUser to true/false
    this.formService.getFormData2(
      this.formInfo.formName,
      this.formInfo._id,
      this.isStudentUser
    );
  }

  // if print and main server are running on different domains or subdomains
  handleDifferentServerSite() {

    this.token = this.authPrintService.getToken();

    if (this.token) {
      console.log("token found without subscription, sending form request");
      this.noLoginInfo = false;
      this.setStudentUser(this.authPrintService.getUser()); // will set isStudentUser to true/false
      this.formService.getFormData2(
        this.formInfo.formName,
        this.formInfo._id,
        this.isStudentUser
      );
    } else {
      // subscribe to token
      this.authSub = this.authPrintService.getAuthStatusListener().subscribe(data => {
        if (data && data.token) {
          this.setStudentUser(data.user);
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

  }


  setStudentUser(user: AuthData) {
    console.log("print-app: in setStudentUser");
    if (!user || ! user.role ) { return; }

    this.isStudentUser = user.role.isStudent;
    console.log("print-app: this.isStudentUser=", this.isStudentUser);
  }

  ngOnDestroy() {

    SubscriptionUtil.unsubscribe(this.paramSubscription);
    SubscriptionUtil.unsubscribe(this.dbSubscription);
    SubscriptionUtil.unsubscribe(this.authSub);
  }

}
