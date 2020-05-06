import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../user.service';
import { AuthData } from '../../auth/auth-data.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.scss'],
})
export class ListUsersPage implements OnInit {

  users: AuthData[];

  userListSub: Subscription;

  // only admins can see the isAdmin column
  isAdminAuth: boolean;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {

    this.isAdminAuth = this.authService.getIsAdminAuth();

    this.userListSub = this.userService.getUserListUpdated().subscribe(res => {
      this.users = res;
    });

    this.userService.listUsers();
  }

}
