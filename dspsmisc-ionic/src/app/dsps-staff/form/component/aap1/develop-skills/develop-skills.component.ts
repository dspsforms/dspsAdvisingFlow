import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data.model';

@Component({
  selector: 'app-develop-skills',
  templateUrl: './develop-skills.component.html',
  styleUrls: ['./develop-skills.component.scss'],
})
export class DevelopSkillsComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() userList: AuthData[];
  
  constructor() { }

  ngOnInit() {}

}
