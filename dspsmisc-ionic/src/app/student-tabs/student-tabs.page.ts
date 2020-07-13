import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-tabs',
  templateUrl: './student-tabs.page.html',
  styleUrls: ['./student-tabs.page.scss'],
})
export class StudentTabsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  gotoFeedback() {
    window.open(environment.feedbackUrl, "_blank");
  }

}
