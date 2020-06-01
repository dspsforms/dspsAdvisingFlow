import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { AuthService } from '../auth.service';
import { SubmitStatus } from '../auth-data.model';
import { UrlConfig } from 'src/app/model/url-config';

@Component({
  selector: 'app-validate-signup',
  templateUrl: './validate-signup.page.html',
  styleUrls: ['./validate-signup.page.scss'],
})
export class ValidateSignupPage implements OnInit , OnDestroy{

  paramSub: Subscription;
  verifyEmailSub: Subscription;

  submitStatus: SubmitStatus;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {

    // create this subscription before anything else
    this.verifyEmailSub = this.authService.getVerifyEmailListener().subscribe(
      res => {
        this.submitStatus = res as SubmitStatus;
        // naviate away. let's not sign in the user automatically. let them provide their password

        if (!res.err) {
          this.router.navigateByUrl(UrlConfig.LOGIN);
        }
        // what do do if there is an errror?
        // ask student to take a screenshot and contact us?
        // TODO
        
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
      this.authService.verifyEmail(randomKey);
      
      
    });

  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.paramSub);
    SubscriptionUtil.unsubscribe(this.verifyEmailSub);
  }


}
