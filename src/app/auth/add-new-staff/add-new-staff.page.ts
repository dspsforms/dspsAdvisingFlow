import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { Role } from '../auth-data.model';
import { NavController } from '@ionic/angular';
import { UrlConfig } from 'src/app/model/url-config';

@Component({
  selector: 'app-add-new-staff',
  templateUrl: './add-new-staff.page.html',
  styleUrls: ['./add-new-staff.page.scss']
})
export class AddNewStaffPage implements OnInit, OnDestroy {

  user;
  errCode: string = null;
  errMsg: string = null;

  displaySignIn = false;
  signUpForm : FormGroup;
  next: string; // url

  querySub: Subscription;

  initialized = false;

  // this is for the user interacting with the form. 
  // user must be admin to create another user
  isAdminAuth = false; 

  // default href for the back button
  defaultHref = UrlConfig.DEFAULT_BACK_BUTTON_HREF;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private authService: AuthService)
  {
    
    this.signUpForm = fb.group({
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      password2: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      isStaff: new FormControl(false, {
        updateOn: 'blur',
      }),
      isAdmin: new FormControl(false, {
        updateOn: 'blur',
      }),
      isFaculty: new FormControl(false, {
        updateOn: 'blur',
      }),
      isInstructor: new FormControl(false, {
        updateOn: 'blur',
      }),
      // not an option in the form, student account flow TBD
      isStudent: new FormControl(false, {
        updateOn: 'blur',
      }),
    }, {
      validator: [this.passwordsMustMatch, this.atLeastOneOfAdminOrStaff, ]
    });

  }

  ngOnInit() {

    this.isAdminAuth = this.authService.getIsAdminAuth();
    if (!this.isAdminAuth) {
      this.router.navigateByUrl("/forms/blueesheet");
    }

    this.initialized = true;

    this.querySub = this.route.queryParams.pipe(filter(params => params.next)).subscribe(params => {
      console.log("next in login:", params.next);
      this.next =  params.next;
    });
  }

  addStaffMember() {
    console.log("signUpForm=", this.signUpForm);

    const role: Role = {
      isStaff: this.signUpForm.value.isStaff,
      isAdmin: this.signUpForm.value.isAdmin,
      isFaculty: this.signUpForm.value.isFaculty, // dsps faculty
      isStudent: this.signUpForm.value.isStudent,
      isInstructor: this.signUpForm.value.isInstructor
    };
    
    this.authService.createUser(
      this.signUpForm.value.email,
      this.signUpForm.value.name,
      this.signUpForm.value.password,
      role,
      this.next);
  }

  ngOnDestroy() {

    SubscriptionUtil.unsubscribe(this.querySub);

  }

  get email() {
    return this.signUpForm.get('email');
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get password() {
      return this.signUpForm.get('password');
  }

  get password2() {
    return this.signUpForm.get('password2');
  }

  get isAdmin() {
    return this.signUpForm.get('isAdmin');
  }

  get isFaculty() {
    return this.signUpForm.get('isFaculty');
  }

  get isStaff() {
    return this.signUpForm.get('isStaff');
  }

  get isInstructor() {
    return this.signUpForm.get('isInstructor');
  }

  get isStudent() {
    return this.signUpForm.get('isStudent');
  }


  atLeastOneOfAdminOrStaff(group: FormGroup) {
    if (group.get('isAdmin').value ||
      group.get('isStaff').value ||
      group.get('isFaculty').value || 
      group.get('isInstructor').value
      ) {
      return null;
    } else {
      return { atLeastOneOfAdminOrStaff: true };
    }
  }

  passwordsMustMatch(group: FormGroup) {

    const passwordControl = group.get('password');
    const password2Control = group.get('password2');
    if (!passwordControl || !password2Control) {
      return null;
    }
    if (passwordControl.value === password2Control.value) {
      return null;
    } else {
      return { passwordsMustMatch: true };
    }
  }

}

