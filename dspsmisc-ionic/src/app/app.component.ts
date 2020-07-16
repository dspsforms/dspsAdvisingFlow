import { Component, OnDestroy, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppGlobalsService } from './dsps-staff/form/app-globals.service';
import { SubscriptionUtil } from './util/subscription-util';

import { AuthData , Role } from './auth/auth-data.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  // isAdminAuth: boolean;
  user: AuthData = null;

  authSub: Subscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private appGlobalsService: AppGlobalsService,
    private router: Router

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }
     
      this.authService.getIsAdminAuth();
    });
  }

  ngOnInit() {

    this.user = this.authService.getUser();
    
    // this.loggedIn = this.authService.getUser() != null;
    this.authSub = this.authService.getAuthStatusListener().subscribe(
      auth => {
        // auth is a user or null
        this.user = auth;
      });
  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.authSub);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

  toggleGrid() {
    this.appGlobalsService.toggleGrid();
  }

  onFeedback() {
    window.open("https://github.com/logsense/dsps-forms-issues", "_blank");
  }

  isDspsAuth() {

    if (!this.user) { return false; }

    const role = this.user.role;
    if (!role) { return false; }

    return (role.isAdmin || role.isFaculty || role.isStaff);
  }

  isAdminAuth() {

    if (!this.user) { return false; }

    const role = this.user.role;
    if (!role) { return false; }

    return (role.isAdmin);
  }

  isStudentAuth() {

    if (!this.user) { return false; }

    const role = this.user.role;
    if (!role) { return false; }

    return (role.isStudent);
  }

  isLoggedIn() {
    return this.user != null; 
  }

  

}
