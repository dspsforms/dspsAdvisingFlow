import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionUtil } from 'src/app/util/subscription-util';

@Component({
  selector: 'app-verify-email-msg',
  templateUrl: './verify-email-msg.page.html',
  styleUrls: ['./verify-email-msg.page.scss'],
})
export class VerifyEmailMsgPage implements OnInit, OnDestroy {

  paramSub: Subscription;

  expirationTime = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.paramSub = this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('expirationTime')) {
        return;
      }

      this.expirationTime = +paramMap.get('expirationTime');
    });
  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.paramSub);
  }
  
}
