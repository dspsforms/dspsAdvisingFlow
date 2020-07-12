import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from '../forms.service';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { FormUtil } from 'src/app/model/form.util';
import { UrlConfig } from 'src/app/model/url-config';

@Component({
  selector: 'app-search-res',
  templateUrl: './search-res.page.html',
  styleUrls: ['./search-res.page.scss'],
})
export class SearchResPage implements OnInit, OnDestroy {

  paramSub: Subscription;
  searchTermSub: Subscription;

  searchTerm: string;

  listOfForms : {};

  busy = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formsService: FormsService) { }

  ngOnInit() {

    this.paramSub = this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('searchTerm')) {
        console.log("no search term");
        return;
      }


      this.searchTerm = paramMap.get('searchTerm');
      console.log("search resutls for ", this.searchTerm);

      // the result has already been pulled by SearchComponent
      // before we got routed here. it's cached in formsService
      this.listOfForms = this.formsService.getSearchResult(this.searchTerm);

      // in the event the user came to this url via a bookmark
      // issue a search request to server
      if (!this.listOfForms) {
        this.busy = true;

        // start a subscription if it's not already started
        if (!this.searchTermSub) {
          this.searchTermSub = this.formsService.getFormsFromSearchListener()
          .subscribe(msgFormData => {

            this.busy = false;
            console.log(msgFormData);
            this.listOfForms = msgFormData['listOfForms'];
          });

        }
        

        this.formsService.search(this.searchTerm);
      }
    });
  }


  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.paramSub);
    SubscriptionUtil.unsubscribe(this.searchTermSub);
  }

  get keys() {
    if (this.listOfForms) {
      return Object.keys(this.listOfForms);
    } else {
      return null;
    }
  }

  getFormTitle(key) {
    return FormUtil.formTitle(key);
  }
  
  showForm(form) {
    /*

    form.formName
    form._id

    url is of the form
      /dsps-staff/form/view/aap1/5ef3d01b3e21d6472a42eca0

    */

    this.router.navigate([
      UrlConfig.BASE_VIEW_FORM_ABSOLUTE,
      form.formName,
      form._id
    ]);
  }

}
