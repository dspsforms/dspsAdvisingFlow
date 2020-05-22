import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-personal-info',
  templateUrl: './student-personal-info.component.html',
  styleUrls: ['./student-personal-info.component.scss'],
})
export class StudentPersonalInfoComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() grid: boolean;
  constructor() { }

  ngOnInit() {}

}
