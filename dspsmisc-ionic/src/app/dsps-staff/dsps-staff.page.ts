import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dsps-staff',
  templateUrl: './dsps-staff.page.html',
  styleUrls: ['./dsps-staff.page.scss'],
})
export class DspsStaffPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  gotoFeedback() {
    window.open(environment.feedbackUrl, "_blank");
  }
}
