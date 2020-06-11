import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseComponent } from '../../base-component';

@Component({
  selector: 'app-student-personal-info',
  templateUrl: './student-personal-info.component.html',
  styleUrls: ['./student-personal-info.component.scss'],
})
export class StudentPersonalInfoComponent extends BaseComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() grid: boolean;

  @Input() mode: 'create' | 'view' | 'edit';
  
  constructor() { 
    super();
  }

  ngOnInit() {}

}
