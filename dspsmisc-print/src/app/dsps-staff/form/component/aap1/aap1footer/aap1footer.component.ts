import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data.model';

import { BaseComponent } from '../../base-component';
import { WrappedForm } from 'src/app/model/wrapped-form.model';


@Component({
  selector: 'app-aap1footer',
  templateUrl: './aap1footer.component.html',
  styleUrls: ['./aap1footer.component.scss'],
})
export class Aap1footerComponent extends BaseComponent  implements OnInit {

  @Input() wrappedForm: WrappedForm;
  @Input() userList: AuthData[];

  @Input() mode: 'create' | 'view' | 'edit';

  constructor() {
    super();
   }

  ngOnInit() { }

  get completedBySignature() {
    if (!this.wrappedForm) { return null; }

    if (this.wrappedForm.formWithLatestHistory['completedBySignature']) {
      return this.wrappedForm.formWithLatestHistory['completedBySignature'].val;
    } else {
      return null;
    }

  }

}
