import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { SubmitStatus } from '../auth-data.model';
import { UrlConfig } from 'src/app/model/url-config';
import { Router } from '@angular/router';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit, OnDestroy {

  changePasswordForm: FormGroup;

  submitSub: Subscription;

  busy = false;

  // submitStatus: SubmitStatus;

  constructor(
    public authService: AuthService,
    public router: Router,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public titleService: Title) { }
  
  initForm() {

    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
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
    this.titleService.setTitle("Change Password");
    this.submitSub = this.authService.getChangePasswordListener().subscribe(
      statusData => {
        // remove spinner
        this.busy = false;
        // this.submitStatus = statusData as SubmitStatus;
        if(!statusData.err) {
          // data successfully submitted
          this.showSuccess(statusData); // will navigate out when user clicks ok
        } else {
          this.showError(statusData);
        }
      }
    );
  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.submitSub);
  }

  ionViewWillEnter() {
    this.initForm();
  }

  isSamePassword(control: AbstractControl) {
    if (control.get('password1').value === control.get('password2').value) {
      return null;
    } else {
      return { isSamePassword: true };
    }
  }

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword');
  }

  get password1() {
    return this.changePasswordForm.get(['newPasswords', 'password1']);
  }


  get password2() {
      return this.changePasswordForm.get(['newPasswords', 'password2']);
  }

  onEnterKeyDown(event) {
    if (!this.changePasswordForm.valid) {
      return;
    }

    this.checkAndUpdatePassword();

  }

  checkAndUpdatePassword() {

    // for the spinner
    this.busy = true;

    this.authService.checkAndUpdatePassword(
      this.changePasswordForm.get('oldPassword').value,
      this.changePasswordForm.get(['newPasswords', 'password1']).value
    );

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

  showError(statusData : SubmitStatus) {
    this.alertCtrl.create({
      header: statusData.message,
      subHeader: String(statusData.err),
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
