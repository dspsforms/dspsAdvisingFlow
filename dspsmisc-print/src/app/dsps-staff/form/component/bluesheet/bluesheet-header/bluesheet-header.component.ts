import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '../../base-component';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-bluesheet-header',
  templateUrl: './bluesheet-header.component.html',
  styleUrls: ['./bluesheet-header.component.scss'],
})
export class BluesheetHeaderComponent extends BaseComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;

  @Input() formTitle;
  @Input() formLabel; // lastname, firstname / course, etc

  constructor() {
    super();
   }

  ngOnInit() { }

  // get studentEmail() {
  //   return this.form.get('studentEmail');
  // }

  get onlineCanvas() {

    if (!this.wrappedForm.formWithLatestHistory ||
      ! this.wrappedForm.formWithLatestHistory['instructionalMode'] ||
      ! this.wrappedForm.formWithLatestHistory['instructionalMode']['onlineCanvas']
      ) { return false; }

    return this.wrappedForm.formWithLatestHistory['instructionalMode']['onlineCanvas'].val;

  }

  get synchronous() {

    if (!this.wrappedForm.formWithLatestHistory ||
      ! this.wrappedForm.formWithLatestHistory['instructionalMode'] ||
      ! this.wrappedForm.formWithLatestHistory['instructionalMode']['synchronous']
      ) { return false; }

    return this.wrappedForm.formWithLatestHistory['instructionalMode']['synchronous'].val;

  }
  get asynchronous() {

    if (!this.wrappedForm.formWithLatestHistory ||
      ! this.wrappedForm.formWithLatestHistory['instructionalMode'] ||
      ! this.wrappedForm.formWithLatestHistory['instructionalMode']['asynchronous']
      ) { return false; }

    return this.wrappedForm.formWithLatestHistory['instructionalMode']['asynchronous'].val;

  }

  get hybrid() {

    if (!this.wrappedForm.formWithLatestHistory ||
      ! this.wrappedForm.formWithLatestHistory['instructionalMode'] ||
      ! this.wrappedForm.formWithLatestHistory['instructionalMode']['hybrid']
      ) { return false; }

    return this.wrappedForm.formWithLatestHistory['instructionalMode']['hybrid'].val;

  }
}
