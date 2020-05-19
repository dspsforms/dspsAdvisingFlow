import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data.model';

@Component({
  selector: 'app-hear-lectures',
  templateUrl: './hear-lectures.component.html',
  styleUrls: ['./hear-lectures.component.scss'],
})
export class HearLecturesComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() userList: AuthData[];
  
  constructor() { }

  ngOnInit() {}

}
