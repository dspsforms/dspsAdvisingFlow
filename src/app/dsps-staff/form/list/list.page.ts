import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from 'src/app/constants/constants';
import { UrlConfig } from 'src/app/model/url-config';
import { Subscription } from 'rxjs';
import { FormsService } from '../forms.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../component/pagination/pagination.service';
import { FormUtil, FormName } from 'src/app/model/form.util';
import { SubscriptionUtil } from 'src/app/util/subscription-util';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit, OnDestroy {

  list;
  private dbSubscription: Subscription;
  private paramSubscription: Subscription;

  busy = false;

  jsonFormat = false;

  state = "current"; // values: current, archived, deleted. investigate enums


  formInfo = { formName: '', formTitle: ''};

    // /submitted2
  submittedAbs = UrlConfig.SUBMITTED_FORM_ABSOLUTE;

  maxItems: number;

  pageSize = Constants.DEFAULT_PAGE_SIZE;
  numPages: number;

  currentPage = 1; // starting at index == 1

  pageInfoChangeSub: Subscription;


  constructor(
    private formService: FormsService,
    private paginationService: PaginationService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.paramSubscription = this._route.params.subscribe(params => {
      this.formInfo.formName = params["formName"];

      if (this.formInfo.formName) {
        this.formInfo.formTitle = FormUtil.formTitle(this.formInfo.formName);
      } else {
         this.formInfo.formTitle = '';
      }

      this.state = params["state"] || 'current';

      this.busy = true;

      this.list = [];


      this.dbSubscription = this.formService.getFormUpdatedListener(this.formInfo.formName)
            .subscribe(formsData => {
              this.list = formsData.items;
              this.maxItems = formsData.maxItems;
              this.busy = false;
            });

      if (!this.pageSize || !this.currentPage) {
        console.log("listForms: illegal (pageSize, currentPage) during init", this.pageSize, this.currentPage);
      } else {
        console.log("listForms: valid (pageSize, currentPage) during init", this.pageSize, this.currentPage);
        this.formService.listForms2(this.formInfo.formName, this.state,
          this.pageSize, this.currentPage);
      }


    }); // param subscription


    this.pageInfoChangeSub = this.paginationService.getPageInfoChangeListener()
      .subscribe(pageInfoData => {
        this.currentPage = pageInfoData.currentPage;
        this.pageSize = pageInfoData.pageSize;

        if (!this.pageSize || !this.currentPage) {
          console.log("listForms: illegal (pageSize, currentPage) from paginationService", this.pageSize, this.currentPage);
        } else {
          console.log("listForms: valid (pageSize, currentPage) from paginationService", this.pageSize, this.currentPage);
          this.formService.listForms2(this.formInfo.formName, this.state,
            this.pageSize, this.currentPage);
        }

      });


  } // ngOnInit

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.dbSubscription);
    SubscriptionUtil.unsubscribe(this.paramSubscription);
  }

  toggleJsonFormat() {
    this.jsonFormat = !this.jsonFormat;
  }

  getKey(item) {
    return item._id;
  }

  getVal(item) {
    if (this.formInfo.formName === FormName.BLUESHEET) {
      return item.form.studentName;
    }

    // old site:

    // if (item.form.fullName) {
    //   return item.form.fullName;
    // }

    // // for complaint, it's firstName middle lastName
    // else {
    //   let c = item.form.firstName;
    //   if (item.form.middle) {
    //     c += " " + item.form.middle;
    //   }
    //   c += " " + item.form.lastName;

    //   return c;
    // }

  }

  getFormName(item) {
    return item.formName;
  }

  isCorrectState(itemState) {
    // for current: (!itemState || itemState === this.state)
    // for others: itemState === this.state

    if (!this.state || this.state === 'current') {
      if (!itemState || itemState === 'current') {
        return true;
      } else {
        return false;
      }
    } else {
      return itemState === this.state;
    }
  }


}


