import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data.model';

@Component({
  selector: 'app-written-course-req',
  templateUrl: './written-course-req.component.html',
  styleUrls: ['./written-course-req.component.scss'],
})
export class WrittenCourseReqComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() userList: AuthData[];

  constructor() { }

  ngOnInit() {}

}
