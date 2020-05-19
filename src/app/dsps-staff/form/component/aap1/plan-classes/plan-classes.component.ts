import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data.model';

@Component({
  selector: 'app-plan-classes',
  templateUrl: './plan-classes.component.html',
  styleUrls: ['./plan-classes.component.scss'],
})
export class PlanClassesComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() userList: AuthData[];
  
  constructor() { }

  ngOnInit() {}

}
