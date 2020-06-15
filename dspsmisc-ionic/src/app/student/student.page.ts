import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormsService } from '../dsps-staff/form/forms.service';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from '../util/subscription-util';
import { AuthData } from '../auth/auth-data.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  studentUser : AuthData;
  studentRecordsSub: Subscription;

  listOfForms : {};
  err;
  message : string;

  busy = false;

  constructor(
    public authService: AuthService,
    public formService: FormsService) { }

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
    }
    else {
      return null;
    }
  }

  showForm(form) {
    console.log(form);
  }
}
