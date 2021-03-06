import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from 'src/app/constants/constants';
import { UrlConfig } from 'src/app/model/url-config';
import { Subscription } from 'rxjs';
import { FormsService } from '../forms.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../component/pagination/pagination.service';
import { FormUtil, FormName } from 'src/app/model/form.util';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { NavController } from '@ionic/angular';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

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

  // layout of listing page for a form
  // was: oldLayout = true;
  // but oldLayout == false is a better look

  oldLayout = environment.listFormsOldLayout;


  constructor(
    private formService: FormsService,
    private paginationService: PaginationService,
    private _route: ActivatedRoute,
    private navCtrl: NavController,
    private titleService: Title
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {

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
              // Submitted Forms: {{ formInfo.formTitle }} 
              let titleStr = "Submitted Forms";
              if (this.formInfo && this.formInfo.formTitle) {
                titleStr += ": " + this.formInfo.formTitle;
              }
              this.titleService.setTitle(titleStr);
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

  ngOnDestroy() { }

  ionViewWillLeave() {

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

    // lastName_firstName_collegeId_course_semester_year -- 

    let result = item.formWithLatestHistory.studentLastName.val + '_' +
        item.formWithLatestHistory.studentFirstName.val + '_' +
      item.formWithLatestHistory.collegeId.val;
    
    if (this.formInfo.formName === FormName.BLUESHEET) {
      // these are all required fields in bluesheet
      result  += '_' + item.formWithLatestHistory.course.val + '_' + 
        item.formWithLatestHistory.semester.val + '_' + 
        item.formWithLatestHistory.year.val;
      
    } else if (this.formInfo.formName === FormName.AAP1) {
      // for AAP1, add semester if non empty
      if (item.formWithLatestHistory.semester && item.formWithLatestHistory.semester.val) {
        result += "_" + item.formWithLatestHistory.semester.val;
      }

    }
    // else if (this.formInfo.formName === FormName.AAP2) {
    //   // for AAP2, nothing to add.
    // }
    else if (this.formInfo.formName === FormName.GREENSHEET) {
      // for greensheet, add semester if non empty 
      // (same as AAP1, but keeping it a separate block, in case requirements change)
      if (item.formWithLatestHistory.semester && item.formWithLatestHistory.semester.val) {
        result += "_" + item.formWithLatestHistory.semester.val;
      }
    }

    return result;

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

  onCreateForm() {
    this.navCtrl.navigateForward(UrlConfig.CREATE_FORM_PRE_ABSOLUTE + this.formInfo.formName);
  }


  toggleLayout() {
    this.oldLayout = !this.oldLayout;
  }

  get showSemester() {

    if (this.formInfo.formName === FormName.BLUESHEET ||
      this.formInfo.formName === FormName.AAP1 || 
      this.formInfo.formName === FormName.GREENSHEET
    ) { return true; }
    else { return false; }

  }

  get showStudentSigStatus() {
    // all except greensheet
    return this.formInfo.formName !== FormName.GREENSHEET;
  }

  get isBluesheet() {

    if (this.formInfo.formName === FormName.BLUESHEET) { return true; }
    else { return false; }

  }

  gotoForm(item) {
    // "['', 'dsps-staff', 'form', 'view', formInfo.formName, item._id]">

    this.navCtrl.navigateForward(['/', 'dsps-staff', 'form', 'view', this.formInfo.formName, item._id])
  }
}


