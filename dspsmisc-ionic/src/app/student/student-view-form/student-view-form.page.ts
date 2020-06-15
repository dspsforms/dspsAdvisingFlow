import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractFormRead } from 'src/app/dsps-staff/form/abstract-form-read';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/dsps-staff/form/forms.service';
import { NavController } from '@ionic/angular';
import { AuthData } from 'src/app/auth/auth-data.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-student-view-form',
  templateUrl: './student-view-form.page.html',
  styleUrls: ['./student-view-form.page.scss'],
})
export class StudentViewFormPage extends AbstractFormRead implements OnInit, OnDestroy {

  studentUser: AuthData;
  signItClicked = false;

  constructor(
    public route: ActivatedRoute,
    public formService: FormsService,
    public navCtrl: NavController,
    public authService: AuthService) { 
    super(route, formService);

    // since user must be logged on to get here, this value is already with AuthService
    // i.e., no observable needed
    this.studentUser = this.authService.getUser();
  }

  ngOnInit() {
  }

  get isOwnForm() {
    // if data is loaded
    if (super.data && super.data.studentEmail !== this.studentUser.email) {
      // not this student's form, get out of here.
      this.navCtrl.navigateBack("/student");
      return false;
    } else if (!super.data) { // data not yet loaded
      return false; 
    }
    return super.data.studentEmail === this.studentUser.email;
  }

  signIt() {
    this.signItClicked = true;
  }
}
