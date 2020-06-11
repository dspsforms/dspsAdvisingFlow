import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data.model';

@Component({
  selector: 'app-health-related-support',
  templateUrl: './health-related-support.component.html',
  styleUrls: ['./health-related-support.component.scss'],
})
export class HealthRelatedSupportComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() userList: AuthData[];
  
  constructor() { }

  ngOnInit() {}

}
