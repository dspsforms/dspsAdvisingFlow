import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data.model';

@Component({
  selector: 'app-personal-issues',
  templateUrl: './personal-issues.component.html',
  styleUrls: ['./personal-issues.component.scss'],
})
export class PersonalIssuesComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() userList: AuthData[];
  
  constructor() { }

  ngOnInit() {}

}
