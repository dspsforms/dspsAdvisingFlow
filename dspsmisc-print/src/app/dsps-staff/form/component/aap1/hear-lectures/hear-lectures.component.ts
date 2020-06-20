import { Component, OnInit, Input } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data.model';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-hear-lectures',
  templateUrl: './hear-lectures.component.html',
  styleUrls: ['./hear-lectures.component.scss'],
})
export class HearLecturesComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;
  @Input() userList: AuthData[];

  constructor() { }

  ngOnInit() {}

}
