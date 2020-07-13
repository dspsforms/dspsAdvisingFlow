import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { UserService } from '../user.service';
import { AuthData } from '../../../auth/auth-data.model';
import { Router, NavigationEnd } from '@angular/router';
import { UrlConfig } from 'src/app/model/url-config';
import { Title } from '@angular/platform-browser';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.scss'],
})
export class ListUsersPage implements OnInit , OnDestroy{

  dspsUsers: AuthData[];


  dspsUserListSub: Subscription;

  routeSub: Subscription;

  // only admins can see isAdmin isStaff and isFaculty columns
  isAdminAuth: boolean;

  isDspsAuth: boolean;

  addNewUserUrl = UrlConfig.ADD_NEW_DSPS_USER;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private titleService: Title) { 
      this.onViewEnter();
    }

  ngOnInit() {
  }

  // this crap is needed because ionViewWillEnter() is not reliably called.
  initSub() {

    this.isAdminAuth = this.authService.getIsAdminAuth();
    this.isDspsAuth = this.authService.getIsDspsAuth();

    if (!this.isDspsAuth) {
      this.router.navigateByUrl('/auth/login');
      return;
    }

    if (this.dspsUserListSub) {
      SubscriptionUtil.unsubscribe(this.dspsUserListSub);
    }

    this.dspsUserListSub = this.userService.getDspsUserListListener().subscribe(res => {
      this.dspsUsers = res;
      this.titleService.setTitle("Users");
    });

    
  }

  /*
  Ionic seems to have a bug. ionViewWillEnter is not firing a 2nd time.
  https://github.com/ionic-team/ionic/issues/16152
  */

  // ionViewWillEnter() {
  //   this.doViewInit();
  // }

  

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.dspsUserListSub);
    SubscriptionUtil.unsubscribe(this.routeSub);
  }

  onViewEnter() {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        filter((event: NavigationEnd) => event.urlAfterRedirects === UrlConfig.LIST_DSPS_USERS_ABSOLUTE)
      )
      .subscribe(p => {
        // console.log('events',p);
        this.doViewInit();
      });
  }

  doViewInit() {

    this.initSub();

    if (!this.isDspsAuth) {
      this.router.navigateByUrl('/auth/login');
      return;
    }

    this.userService.listDspsUsers();
    
  }

}
