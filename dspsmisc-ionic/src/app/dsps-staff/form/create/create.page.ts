import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from '../forms.service';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { UrlConfig } from 'src/app/model/url-config';
import { FormName, FormUtil } from 'src/app/model/form.util';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit , OnDestroy {

  paramSub: Subscription;

  formName: string;
  formDisplayName: string; // user friendly name for formName

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formsService: FormsService) { }

  ngOnInit() {
    this.paramSub = this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('formName')) {
        console.log("no formName for create");
        this.router.navigateByUrl(UrlConfig.DEFAULT_BACK_BUTTON_HREF);
        return;
      }

      this.formName = paramMap.get('formName');
      this.formDisplayName = FormUtil.formTitle(this.formName);

    });
  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.paramSub);
  }

}
