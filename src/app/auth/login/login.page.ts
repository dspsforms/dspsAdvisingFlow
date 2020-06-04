import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { ModalController } from '@ionic/angular';
import { ResetPasswordStep1Component } from '../reset-password-step1/reset-password-step1.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit, OnDestroy {

  user;
  errCode: string = null;
  errMsg: string = null;

  displaySignIn = false;
  signInForm: FormGroup;

  next: string;
  querySub: Subscription;

  successMsg: string = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public modalCtrl: ModalController,
    private authService: AuthService)
  {
    this.signInForm = fb.group({
      email: new FormControl(null, {
        // updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        // updateOn: 'blur',
        validators: [Validators.required]
      })
    });

  }

  ngOnInit() {

    console.log("testing 123");
    this.route.queryParams.subscribe(params => {
      console.log("queryParams in login", params);
    });

    this.querySub =  this.route.queryParams.pipe(filter(params => params.next)).subscribe(params => {
      console.log("next in login:", params.next);
      console.log("and in login, params=:", params);
      this.next =  params.next;
    });

    
    /*
    this will not work because the route has already changed to /login

    // hold on to the url we came from, so we can redirect to that url
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.prevUrl = event.url;
        console.log('prevUrl=', this.prevUrl);
      }
    });
    */

  }

  ionViewWillEnter() {
      // if we are logged in, go to dsps-staff or student
    if (this.authService.getIsDspsAuth()) {
      this.router.navigateByUrl('/dsps-staff');

    } else if (this.authService.getIsStudentAuth()) {
      this.router.navigateByUrl('/student'); // TBD
    } else if (this.authService.getIsInstructorAuth()) {
      this.router.navigateByUrl('/instructor'); // TBD
    }
  }

  login() {

    if (!this.signInForm.valid) {
      return;
    }

    // redirect to prevUrl (or / if empty) after login
    this.authService.login(this.signInForm.value.email,
      this.signInForm.value.password, this.next);


  }

  onEnterKeyDown(event) {
    if (!this.signInForm.valid) {
      return;
    }

    this.login();

  }

  ngOnDestroy() {

    SubscriptionUtil.unsubscribe(this.querySub);

  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
      return this.signInForm.get('password');
  }

  openForgotPasswordModal() {

    console.log("before opening modal");
    this.modalCtrl.create({
      component: ResetPasswordStep1Component,
      componentProps: {}
    })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss(); // this is a promise
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirmed') {
          this.successMsg = resultData.data.message;
          console.log('email sent!');
        }
      }).catch(err => {
        console.log(err);
      });

  }

}
