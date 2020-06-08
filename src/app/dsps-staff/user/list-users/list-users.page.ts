import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { UserService } from '../user.service';
import { AuthData } from '../../../auth/auth-data.model';
import { Router } from '@angular/router';
import { UrlConfig } from 'src/app/model/url-config';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.scss'],
})
export class ListUsersPage implements OnInit {

  dspsUsers: AuthData[];


  dspsUserListSub: Subscription;

  // only admins can see isAdmin isStaff and isFaculty columns
  isAdminAuth: boolean;

  isDspsAuth: boolean;

  addNewUserUrl = UrlConfig.ADD_NEW_DSPS_USER;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {

    this.isAdminAuth = this.authService.getIsAdminAuth();
    this.isDspsAuth = this.authService.getIsDspsAuth();

    if (!this.isDspsAuth) {
      this.router.navigateByUrl('/auth/login');
      return;
    }

    this.dspsUserListSub = this.userService.getDspsUserListListener().subscribe(res => {
      this.dspsUsers = res;
    });

    
  }

  ionViewWillEnter() {

    if (!this.isDspsAuth) {
      this.router.navigateByUrl('/auth/login');
      return;
    }

    this.userService.listDspsUsers();
    
  }

}
