import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data.model';

import { BaseComponent } from '../../base-component';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-aap1header',
  templateUrl: './aap1header.component.html',
  styleUrls: ['./aap1header.component.scss'],
})
export class Aap1headerComponent extends BaseComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;
  constructor() {
    super();
   }

  ngOnInit() { }

}
