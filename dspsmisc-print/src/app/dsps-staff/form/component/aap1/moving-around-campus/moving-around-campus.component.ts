import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data.model';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-moving-around-campus',
  templateUrl: './moving-around-campus.component.html',
  styleUrls: ['./moving-around-campus.component.scss'],
})
export class MovingAroundCampusComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;
  @Input() userList: AuthData[];
  constructor() { }

  ngOnInit() {}

}
