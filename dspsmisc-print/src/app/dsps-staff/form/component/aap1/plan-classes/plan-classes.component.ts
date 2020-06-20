import { Component, OnInit, Input } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data.model';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-plan-classes',
  templateUrl: './plan-classes.component.html',
  styleUrls: ['./plan-classes.component.scss'],
})
export class PlanClassesComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;
  @Input() userList: AuthData[];

  constructor() { }

  ngOnInit() {}

}
