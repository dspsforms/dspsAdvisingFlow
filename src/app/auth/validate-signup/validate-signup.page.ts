import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { AuthService } from '../auth.service';
import { SubmitStatus, MongoErr } from '../auth-data.model';
import { UrlConfig } from 'src/app/model/url-config';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-validate-signup',
  templateUrl: './validate-signup.page.html',
  styleUrls: ['./validate-signup.page.scss'],
})
export class ValidateSignupPage implements OnInit , OnDestroy{

  paramSub: Subscription;
  verifyEmailSub: Subscription;

  // submitStatus: SubmitStatus;

  busy = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertCtrl: AlertController) { }

  ngOnInit() {

    // create this subscription before anything else
    this.verifyEmailSub = this.authService.getVerifyEmailListener().subscribe(
      res => {
        
        this.busy = false;
        if (!res.err) {
          this.signUpSuccessful();
        } else {

          this.showError(res as SubmitStatus);
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
      this.authService.verifyEmail(randomKey);
      
    });

  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.paramSub);
    SubscriptionUtil.unsubscribe(this.verifyEmailSub);
  }

  signUpSuccessful() {
    // TODO
    this.alertCtrl.create({
      header: 'Welcome Aboard!',
      buttons: [{
        text: 'Okay',
        handler: () => {
          this.router.navigateByUrl(UrlConfig.LOGIN);
        }
      }]
    }).then(alertElem => {
      alertElem.present();
    });
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



}
