import { Component, OnInit, Input } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data.model';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss'],
})
export class OtherComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;
  @Input() userList: AuthData[];

  constructor() { }

  ngOnInit() {}

}
