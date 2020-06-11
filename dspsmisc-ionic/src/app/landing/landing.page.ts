import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Role } from '../auth/auth-data.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const role: Role = this.authService.getRole();
    if (!role) {
      // user not logged in
      this.router.navigateByUrl('/auth/login');
    } else if (role.isAdmin || role.isStaff || role.isFaculty) {
      this.router.navigateByUrl('/dsps-staff');
    } else if (role.isStudent) {
      this.router.navigateByUrl('/student');
    } else if (role.isInstructor) {
      this.router.navigateByUrl('/instructor');
    } else {
      console.log("unknown role, logging user out ", role);
      this.authService.logout();
    }
  }

}
