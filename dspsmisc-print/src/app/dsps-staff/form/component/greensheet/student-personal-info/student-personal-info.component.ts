import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseComponent } from '../../base-component';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-student-personal-info',
  templateUrl: './student-personal-info.component.html',
  styleUrls: ['./student-personal-info.component.scss'],
})
export class StudentPersonalInfoComponent extends BaseComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;

  @Input() formTitle;
  @Input() formLabel; // lastname, firstname etc

  constructor() {
    super();
  }

  ngOnInit() {}

}
