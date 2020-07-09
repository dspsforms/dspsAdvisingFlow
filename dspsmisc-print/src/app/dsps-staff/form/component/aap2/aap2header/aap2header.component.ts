import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseComponent } from '../../base-component';
import { WrappedForm } from 'src/app/model/wrapped-form.model';


@Component({
  selector: 'app-aap2header',
  templateUrl: './aap2header.component.html',
  styleUrls: ['./aap2header.component.scss'],
})
export class Aap2headerComponent extends BaseComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;
  @Input() formTitle;
  @Input() formLabel; // lastname, firstname etc

  constructor() {
    super();
  }

  ngOnInit() { }

  // get studentEmail() {
  //   return this.form.get('studentEmail');
  // }

}
