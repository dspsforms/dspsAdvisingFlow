import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reset-password-step1',
  templateUrl: './reset-password-step1.component.html',
  styleUrls: ['./reset-password-step1.component.scss'],
})
export class ResetPasswordStep1Component implements OnInit, OnDestroy {

  form: FormGroup;

  resetPasswordStep1Sub: Subscription;

  resetPasswordStep1Count = 0;
  keyDownCount = 0;

  constructor(
    public modalCtrl: ModalController,
    public authService: AuthService,
    public titleService: Title) { 
    this.form = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.email]
      })
    });
  }

  ngOnInit() {
    this.titleService.setTitle("Reset Password");
    this.resetPasswordStep1Sub = this.authService.getResetPasswordStep1Listener()
      .subscribe(submitStatus => {
      
        // dismiss modal
        if (submitStatus.err) {
          this.modalCtrl.dismiss({ err: submitStatus.err}, 'confirmed');
        } else {
          this.modalCtrl.dismiss({message: submitStatus.message}, 'confirmed');
        }
        
      });
  }

  resetPasswordStep1() {

    
    if (!this.form.valid) {
      return;
    }

    this.resetPasswordStep1Count++;

    console.log("resetPasswordStep1Count=", this.resetPasswordStep1Count);
    

    // ask server to email this user a randomStr link
    this.authService.resetPasswordStep1(this.form.value.email);

  }

  onEnterKeyDown(event) {

    this.keyDownCount++;

    console.log("keyDownCount=", this.keyDownCount);

    if (!this.form.valid) {
      return;
    }

    this.resetPasswordStep1();

  }


  get email() {
    return this.form.get('email');
  }


  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');

  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.resetPasswordStep1Sub);
  }

}
