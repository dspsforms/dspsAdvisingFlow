import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthData, UserFromRandomKey, SubmitStatus, MongoErr } from '../auth-data.model';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { UrlConfig } from 'src/app/model/url-config';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reset-password-step2',
  templateUrl: './reset-password-step2.page.html',
  styleUrls: ['./reset-password-step2.page.scss'],
})
export class ResetPasswordStep2Page implements OnInit, OnDestroy {

  paramSub: Subscription;
  retrieveUserSub: Subscription;

  // submitStatus: SubmitStatus;

  busy = false;

  user: AuthData = null;

  resetPasswordForm: FormGroup;

  submitSub: Subscription;
  busy2 = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private titleService: Title) {
    this.initForm();
  }
  
  initForm() {

      this.resetPasswordForm = new FormGroup({
        email: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required, Validators.email]
        }),
        // hidden variable
        key: new FormControl(null),
        newPasswords: new FormGroup({
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
      });
      
  }

  ngOnInit() {
    this.titleService.setTitle("Reset Password");

    // create this subscription before anything else
    this.retrieveUserSub = this.authService.getRetrieveUserFromRandomKeyListener().subscribe(
      res => {
        
        this.busy = false;
        if (!res.err) {
          this.user = res.user;

          // verify
          if (this.user) {

            // this cannot really happen -- because the server is
            // fetching user based on emailFromRandomKey
            if (this.user.email !== res.emailFromRandomKey) {
              console.log('user.email=', this.user.email);
              console.log('emailFromRandomKey=', res.emailFromRandomKey);
              console.log('should have been equal');
              // should probably redirect out of here?
            }

            // set the hidden input param 'key' to the value of randomKey
            this.resetPasswordForm.get('key').setValue(res.key);
          } 
          // show form to set password
          
        } else {

          this.showError(res as UserFromRandomKey);
        }
        
        
      }
    );

    this.paramSub = this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('randomKey')) {
        // invalid
        this.router.navigateByUrl('/');
        return;
      }
      // else
      // verify randomKey
      const randomKey = paramMap.get('randomKey');
      // issue a request to server

      this.busy = true;
      this.authService.retrieveUserFromRandomKey(randomKey);
      
    });

    this.submitSub = this.authService.getResetPasswordStep2Listener().subscribe(
      statusData => {
        // remove spinner
        this.busy2 = false;
        // this.submitStatus = statusData as SubmitStatus;
        if (!statusData.err) {
          // data successfully submitted
          this.showSuccess(statusData); // will navigate out when user clicks ok
        } else {
          this.showError(statusData);
        }
      }
    );

  }


  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.paramSub);
    SubscriptionUtil.unsubscribe(this.retrieveUserSub);
    SubscriptionUtil.unsubscribe(this.submitSub);
  }

 
  showSuccess(statusData: SubmitStatus) {
    this.actionSheetCtrl.create({
      header: statusData.message,
      buttons: [{
        text: 'Okay',
        handler: () => {
          this.router.navigateByUrl(UrlConfig.LANDING);
        }
      }]
    }).then(actionSheetElem => {
      actionSheetElem.present();
    });
  }

  showError(data: UserFromRandomKey) {
    let errMsg = String(data.err);

    const err = data.err as MongoErr;
    if (err.errmsg) {
      errMsg = err.errmsg;
      // remove collection info if any
      const index = errMsg.indexOf('collection');
      if (index >= 0) {
        // truncate
        errMsg = errMsg.substring(0, index);
      }
    } else if (data.err instanceof Object) {
      errMsg = JSON.stringify(data.err);
    } 
    this.alertCtrl.create({
      header: data.message,
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



  isSamePassword(control: AbstractControl) {
    if (control.get('password1').value === control.get('password2').value) {
      return null;
    } else {
      return { isSamePassword: true };
    }
  }

  get email() {
    return this.resetPasswordForm.get('email');
  }

  get password1() {
    return this.resetPasswordForm.get(['newPasswords', 'password1']);
  }


  get password2() {
      return this.resetPasswordForm.get(['newPasswords', 'password2']);
  }

  onEnterKeyDown(event) {
    this.resetPasswordStep2();
  }

  resetPasswordStep2() {

    if (!this.resetPasswordForm.valid) {
      return;
    }

    // for the spinner
    this.busy2 = true;

    console.log(this.resetPasswordForm);

    this.authService.resetPasswordStep2(
      this.resetPasswordForm.get('email').value,
      this.resetPasswordForm.get(['newPasswords', 'password1']).value,
      this.resetPasswordForm.get('key').value
    );

  }


}
