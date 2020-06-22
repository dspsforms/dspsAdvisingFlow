import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;

  constructor() { }

  ngOnInit() { }

  get generalNotes() {
    if (this.wrappedForm && this.wrappedForm.formWithLatestHistory
      && this.wrappedForm.formWithLatestHistory['generalNotes']) {
      return this.wrappedForm.formWithLatestHistory['generalNotes'].val;
    }
    else { return null;}
  }

}
