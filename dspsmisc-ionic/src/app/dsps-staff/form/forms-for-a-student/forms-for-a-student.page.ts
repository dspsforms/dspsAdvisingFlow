import { Component, OnInit, OnDestroy } from '@angular/core';
import { UrlConfig } from 'src/app/model/url-config';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from '../forms.service';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { FormUtil, FormName } from 'src/app/model/form.util';
import { Student } from 'src/app/model/student.model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-forms-for-a-student',
  templateUrl: './forms-for-a-student.page.html',
  styleUrls: ['./forms-for-a-student.page.scss'],
})
export class FormsForAStudentPage implements OnInit, OnDestroy {

  // forms for a student is the same as search results for that student.
  // difference is the output display doesn't say "search results"
  paramSub: Subscription;
  searchTermSub: Subscription;

  oneStudentSub: Subscription;

  collegeId: string;
  student: Student;

  listOfForms : {};

  busy = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formsService: FormsService,
    private userService: UserService) { }

  ngOnInit() { }

  ionViewWillEnter() {

    this.paramSub = this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('collegeId')) {
        console.log("no collegeId");
        return;
      }
     

      this.collegeId = paramMap.get('collegeId');
      console.log("collegeId= ", this.collegeId);

      // first check if student is in cache
      this.student = this.userService.getStudentFromCache(this.collegeId);

      if (!this.student) {
        this.oneStudentSub = this.userService.getOneStudentListener()
          .subscribe(res => {
            this.student = res;
          });
        
        // schedule
        this.userService.fetchStudentFromServer(this.collegeId);
        
      }


      // the result has already been pulled by SearchComponent
      // before we got routed here. it's cached in formsService
      this.listOfForms = this.formsService.getSearchResult(this.collegeId);

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
        
        this.formsService.search(this.collegeId);
      }
    });
  }

  ionViewWillExit() {
    SubscriptionUtil.unsubscribe(this.paramSub);
    SubscriptionUtil.unsubscribe(this.searchTermSub);
    SubscriptionUtil.unsubscribe(this.oneStudentSub);
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

  showFormInfo(form) {
    // same logic as used in list
    let result = '';

    if (form.formName === FormName.BLUESHEET) {
      // these are all required fields in bluesheet
      result  =  form.formWithLatestHistory.course.val + ' / ' + 
        form.formWithLatestHistory.semester.val + ' / ' + 
        form.formWithLatestHistory.year.val;
      
    } else if (form.formName === FormName.AAP1) {
      // for AAP1, add semester if non empty
      if (form.formWithLatestHistory.semester && form.formWithLatestHistory.semester.val) {
        result = form.formWithLatestHistory.semester.val;
      }

    }
    // else if (this.formInfo.formName === FormName.AAP2) {
    //   // for AAP2, nothing to add.
    // }
    else if (form.formName === FormName.GREENSHEET) {
      // for greensheet, add semester if non empty 
      // (same as AAP1, but keeping it a separate block, in case requirements change)
      if (form.formWithLatestHistory.semester && form.formWithLatestHistory.semester.val) {
        result = form.formWithLatestHistory.semester.val;
      }
    }

    return result;
  }

  get studentName() {
    
    if (this.student) {
      return this.student.name;
    } else {
      return null;
    }
  }

  get defaultHref() {
    return UrlConfig.DEFAULT_BACK_BUTTON_HREF;
  }

  get isEmpty() {
    if (!this.listOfForms) { return true; }

    // if there is any record for any of the form types, return false
    let nonEmptyObj = null;
    
    // find the first non empty form type
    nonEmptyObj = this.keys.find(key => {
      if (this.listOfForms[key] && this.listOfForms[key].length > 0) {
        return true;
      }
    });
    
    return nonEmptyObj == null;

  }

}
