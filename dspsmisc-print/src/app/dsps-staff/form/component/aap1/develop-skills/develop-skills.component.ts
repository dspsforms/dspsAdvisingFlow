import { Component, OnInit, Input } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data.model';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-develop-skills',
  templateUrl: './develop-skills.component.html',
  styleUrls: ['./develop-skills.component.scss'],
})
export class DevelopSkillsComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;
  @Input() userList: AuthData[];

  constructor() { }

  ngOnInit() {}

}
