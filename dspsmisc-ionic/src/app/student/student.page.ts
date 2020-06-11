import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  ownUserId;
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.ownUserId = this.authService.getUserId();
    
    // get the student record for ownUserId
  }

}
