import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { Subscription } from 'rxjs';
import { AuthData } from 'src/app/auth/auth-data.model';
import { UserService } from '../user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { UrlConfig } from 'src/app/model/url-config';
import { Student } from 'src/app/model/student.model';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.page.html',
  styleUrls: ['./list-students.page.scss'],
})
export class ListStudentsPage implements OnInit, OnDestroy {

  students: Student[];


  studentsSub: Subscription;

  routeSub: Subscription;

  // only admins can see isAdmin isStaff and isFaculty columns
  isAdminAuth: boolean;

  isDspsAuth: boolean;


  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private titleService: Title) { 
      this.onViewEnter();
    }

  ngOnInit() {

    this.isAdminAuth = this.authService.getIsAdminAuth();
    this.isDspsAuth = this.authService.getIsDspsAuth();

    if (!this.isDspsAuth) {
      this.router.navigateByUrl('/auth/login');
      return;
    }

    this.studentsSub = this.userService.getStudentsListener().subscribe(res => {
      this.students = res;
      this.titleService.setTitle("Students");
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
    SubscriptionUtil.unsubscribe(this.studentsSub);
    SubscriptionUtil.unsubscribe(this.routeSub);
  }

  onViewEnter() {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        filter((event: NavigationEnd) => event.urlAfterRedirects === UrlConfig.LIST_STUDENTS_ABSOLUTE)
      )
      .subscribe(p => {
        // console.log('events',p);
        this.doViewInit();
      });
  }

  doViewInit() {

    if (!this.isDspsAuth) {
      this.router.navigateByUrl('/auth/login');
      return;
    }

    this.userService.listStudents();
    
  }

}
