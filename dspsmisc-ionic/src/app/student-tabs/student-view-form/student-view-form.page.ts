import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractFormRead } from 'src/app/dsps-staff/form/abstract-form-read';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/dsps-staff/form/forms.service';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AuthData } from 'src/app/auth/auth-data.model';
import { AuthService } from 'src/app/auth/auth.service';
import { SigCreateComponent } from 'src/app/dsps-staff/form/component/sig-create/sig-create.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-student-view-form',
  templateUrl: './student-view-form.page.html',
  styleUrls: ['./student-view-form.page.scss'],
})
export class StudentViewFormPage extends AbstractFormRead implements OnInit, OnDestroy {

  studentUser: AuthData;
  // signItClicked = false;

  errMsg: string;
  successMsg: string;

  focusOnSignature = false; // if true, focus will shift to signature area

  // params are formName, formId, see AbstractFormRead

  constructor(
    public route: ActivatedRoute,
    public formService: FormsService,
    public navCtrl: NavController,
    public authService: AuthService,
    public modalCtrl: ModalController,
    public titleService: Title) { 
    super(route, formService, titleService);

    // this way, the backend api url will be modified to return 
    // student's own data. the backend api will perform additional
    // tamper proof checks anyways to ensure someone else's data is not returned
    super.setStudentUser(true);

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

  // signIt() {
  //   this.signItClicked = true;
  // }

  openSignItModal() {

    console.log("before opening modal");
    this.modalCtrl.create({
      component: SigCreateComponent,
      componentProps: {
        signer: this.studentUser,
        formBeingSigned : this.data
      }
    })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss(); // this is a promise
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirmed') {

          if (resultData.data.err) {
            this.errMsg = resultData.data.err;
          } else {
            this.successMsg = resultData.data.message;
            console.log("this.data=", this.data);
            if (!this.data.signatures) {
              this.data['signatures'] = [resultData.data.signature];
            } else {
              this.data.signatures.push(resultData.data.signature);
            }

            this.data.studentSigStatus = 'signed';

            this.focusOnSignature = true;

          }
          
        }
      }).catch(err => {
        console.log(err);
      });

  }

  // for testing focus change
  // toggleFocus() {
    
  //   this.focusOnSignature = !this.focusOnSignature;
  //   console.log("focusOnSignature after toggle=", this.focusOnSignature);
  // }

  
}
