import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FormValidators } from 'src/app/dsps-staff/form/form-validators';
import { UrlConfig } from 'src/app/model/url-config';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { SubmitStatus, MongoErr } from '../auth-data.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-student-signup',
  templateUrl: './student-signup.page.html',
  styleUrls: ['./student-signup.page.scss'],
})
export class StudentSignupPage implements OnInit , OnDestroy {

  signUpForm: FormGroup;

  // submitStatus: SubmitStatus;

  submitSub: Subscription;

  busy = false;

  // if student already has created an account (duplicate email)
  duplicateAccountErr = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    public alertCtrl: AlertController) {
    
    this.signUpForm = fb.group({
      studentName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),

      collegeId: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, FormValidators.collegeIdFormat]
      }),

      email: new FormControl(null, {
        // updateOn: 'blur',
        validators: [Validators.required, Validators.email, FormValidators.validWvmEmail]
      }),

      passwords: new FormGroup({
        password1: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        password2: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
      }, {
          validators: this.isSamePassword
      }),

      cellPhone: new FormControl(null, { updateOn: 'change' }),
      
      });
  }

  isSamePassword(control: AbstractControl) {
    // check for null -- during initialization
    if (! control.get(['passwords', 'password1']) || !control.get(['passwords', 'password2'])) {
      return null;
    } else if (control.get(['passwords', 'password1']).value === control.get(['passwords', 'password2']).value) {
      return null;
    } else {
      return { isSamePassword: true };
    }
  }

  ngOnInit() {

    this.submitSub = this.authService.getCreateStudentListener().subscribe(
      statusData => {
        // remove spinner
        this.busy = false;
        this.duplicateAccountErr = false;
        // this.submitStatus = statusData as SubmitStatus;
        if(!statusData.err) {
          // data successfully submitted
          this.showSuccess(statusData); // will navigate out when user clicks ok
        } else {

          // check if this is a duplicate account error

          // e.g.,
          // MongoError: E11000 duplicate key error collection: 
          // dspsmisc.students index: email_1 dup key: { : "foo@wvm.edu" }

          const err = statusData.err as MongoErr;
          if (err.errmsg && err.errmsg.indexOf('duplicate key') >= 0) {
            this.duplicateAccountErr = true;
          } else {
            this.showError(statusData);
          }
          
        }
      }
    );
  }

  get studentName() {
    return this.signUpForm.get('studentName');
  }

  get collegeId() {
    return this.signUpForm.get('collegeId');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password1() {
      return this.signUpForm.get(['passwords', 'password1']);
  }


  get password2() {
      return this.signUpForm.get(['passwords', 'password2']);
  }

  onEnterKeyDown(event) {
    this.signUp();
  }

  signUp() {

    if (!this.signUpForm.valid) {
      return;
    }

    // for the spinner
    this.busy = true;

    this.authService.createStudentUserStep1(
      this.signUpForm.get('email').value,
      this.signUpForm.get('studentName').value,
      this.signUpForm.get('passwords').get('password1').value,
      this.signUpForm.get('collegeId').value,
      this.signUpForm.get('cellPhone').value
    );

  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.submitSub);
  }

  showSuccess(statusData: SubmitStatus) {
    
    let navigateTo = UrlConfig.VERIFY_EMAIL_MSG;
    if (statusData.expirationTime) {
      navigateTo += "/" + statusData.expirationTime;
     
    }
    this.router.navigateByUrl(navigateTo);

    // this.alertCtrl.create({
    //   header: statusData.message,
    //   buttons: [{
    //     text: 'Okay',
    //     handler: () => {
    //       this.router.navigateByUrl(UrlConfig.LANDING);
    //     }
    //   }]
    // }).then(alertElem => {
    //   alertElem.present();
    // });
  }

  showError(statusData: SubmitStatus) {
    let errMsg = String(statusData.err);

    const err = statusData.err as MongoErr;
    if (err.errmsg) {
      errMsg = err.errmsg;
      // remove collection info if any
      const index = errMsg.indexOf('collection');
      if (index >= 0) {
        // truncate
        errMsg = errMsg.substring(0, index);
      }
    } else if (statusData.err instanceof Object) {
      errMsg = JSON.stringify(statusData.err);
    } 
    this.alertCtrl.create({
      header: statusData.message,
      subHeader: errMsg,
      buttons: [{
        text: 'Okay',
        handler: () => {
          // stay on page, i.e., no-op
        }
      }]
    }).then(alertElem => {
      alertElem.present();
    });
  }

  newVerificationLink() {
    // TODO
    this.alertCtrl.create({
      header: 'This is a TODO',
      subHeader: 'As a workaround, please talk to your IT person',
      buttons: [{
        text: 'Okay',
        handler: () => {
          // stay on page, i.e., no-op
        }
      }]
    }).then(alertElem => {
      alertElem.present();
    });
  }

}
