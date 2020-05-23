import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-part3',
  templateUrl: './student-part3.component.html',
  styleUrls: ['./student-part3.component.scss'],
})
export class StudentPart3Component implements OnInit {

  @Input() form: FormGroup;
  @Input() grid: boolean;
  constructor() { }

  ngOnInit() {}

}
