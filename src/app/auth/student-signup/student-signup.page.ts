import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FormValidators } from 'src/app/dsps-staff/form/form-validators';
import { UrlConfig } from 'src/app/model/url-config';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { SubmitStatus } from '../auth-data.model';

@Component({
  selector: 'app-student-signup',
  templateUrl: './student-signup.page.html',
  styleUrls: ['./student-signup.page.scss'],
})
export class StudentSignupPage implements OnInit {

  signUpForm: FormGroup;

  submitStatus: SubmitStatus;

  submitSub: Subscription;

  busy = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService) {
    
    this.signUpForm = fb.group({
      studentName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),

      collegeId: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, FormValidators.collegeIdFormat]
      }),

      email: new FormControl(null, {
        // updateOn: 'blur',
        validators: [Validators.required, Validators.email, FormValidators.validWvmEmail]
      }),

      passwords: new FormGroup({
        password1: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        password2: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
      }, {
          validators: this.isSamePassword
      }),

      cellPhone: new FormControl(null, { updateOn: 'change' }),
      
      });
  }

  isSamePassword(control: AbstractControl) {
    if (control.get('password1') === control.get('password2').value) {
      return null;
    } else {
      return { isSamePassword: true };
    }
  }

  ngOnInit() {
  }

  get studentName() {
    return this.signUpForm.get('studentName');
  }

  get collegeId() {
    return this.signUpForm.get('collegeId');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password1() {
      return this.signUpForm.get(['passwords', 'password1']);
  }


  get password2() {
      return this.signUpForm.get(['passwords', 'password2']);
  }

  onEnterKeyDown(event) {
    if (!this.signUpForm.valid) {
      return;
    }

    this.signUp();

  }

  signUp() {

    // for the spinner
    this.busy = true;

    this.submitSub = this.authService.getCreateStudentListener().subscribe(
      statusData => {
        // remove spinner
        this.busy = false;
        this.submitStatus = statusData as SubmitStatus;
        if (!statusData.err) {
          // data successfully submitted
          // ask user to verify message
          this.router.navigateByUrl(UrlConfig.VERIFY_EMAIL_MSG);
        }
      }
    );

    this.authService.createStudentUserStep1(
      this.signUpForm.get('email').value,
      this.signUpForm.get('studentName').value,
      this.signUpForm.get('passwords').get('password1').value,
      this.signUpForm.get('collegeId').value,
      this.signUpForm.get('cellPhone').value
    );

  }

  ionViewWillExit() {
    SubscriptionUtil.unsubscribe(this.submitSub);
  }

}
