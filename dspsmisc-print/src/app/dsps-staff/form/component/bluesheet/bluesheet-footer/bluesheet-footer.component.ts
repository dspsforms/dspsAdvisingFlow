import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseComponent } from '../../base-component';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-bluesheet-footer',
  templateUrl: './bluesheet-footer.component.html',
  styleUrls: ['./bluesheet-footer.component.scss'],
})
export class BluesheetFooterComponent extends BaseComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;

  @Input() mode: 'create' | 'view' | 'edit';

  constructor() {
    super();
  }

  ngOnInit() {}

  get completedBySignature() {
    if (!this.wrappedForm) { return null; }

    if (this.wrappedForm.formWithLatestHistory['completedBySignature']) {
      return this.wrappedForm.formWithLatestHistory['completedBySignature'].val;
    } else {
      return null;
    }

  }

  get completedByDate() {

    if (!this.wrappedForm) { return null; }

    if (this.wrappedForm.formWithLatestHistory['completedByDate']) {
      return this.wrappedForm.formWithLatestHistory['completedByDate'].val;
    } else {
      return null;
    }

  }



}
