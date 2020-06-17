import { Component, OnInit } from '@angular/core';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { AuthData } from 'src/app/auth/auth-data.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { FormsService } from 'src/app/dsps-staff/form/forms.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {

  studentUser: AuthData;
  studentRecordsSub: Subscription;

  listOfForms: {};
  err;
  message: string;

  busy = false;

  constructor(
    public authService: AuthService,
    public formService: FormsService,
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.studentUser = this.authService.getUser();
    
    // get list of student records for this student
    this.studentRecordsSub = this.formService.getStudentRecordsStatusListener()
      .subscribe(data => {

        this.busy = false;
        this.err = data.err || null;

        this.message = data.message || null;
        this.listOfForms = data.listOfForms || null;

      });
    
    this.busy = true;
    this.formService.listFormsForStudent(null); // get all forms for this student, not just pending

  }

  ionViewWillExit() { 
    SubscriptionUtil.unsubscribe(this.studentRecordsSub);

  }

  get keys() {
    if (this.listOfForms) {
      return Object.keys(this.listOfForms);
    } else {
      return null;
    }
  }

  showForm(form) {
    console.log("going to", form);
    // /student/student-view-form/:formName/:formId
    const url = '/student/student-view-form/' + form.formName + '/' + form._id;
    this.navCtrl.navigateForward(url);
  }

}
