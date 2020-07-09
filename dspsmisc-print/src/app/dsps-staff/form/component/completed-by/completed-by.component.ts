import { Component, OnInit, Input } from '@angular/core';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-completed-by',
  templateUrl: './completed-by.component.html',
  styleUrls: ['./completed-by.component.scss']
})
export class CompletedByComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;
  constructor() { }

  ngOnInit() {
  }

  get completedBySignature() {
    if (!this.wrappedForm) { return null; }

    if (this.wrappedForm.formWithLatestHistory['completedBySignature']) {
      return this.wrappedForm.formWithLatestHistory['completedBySignature'].val;
    } else {
      return null;
    }

  }
}
