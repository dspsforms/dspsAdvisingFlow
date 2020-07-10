import { Component, OnInit, Input } from '@angular/core';
import { Signature } from 'src/app/model/signature.model';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-joint-sig-view',
  templateUrl: './joint-sig-view.component.html',
  styleUrls: ['./joint-sig-view.component.scss']
})
export class JointSigViewComponent implements OnInit {

  @Input() wrappedForm: WrappedForm; // for completedBy
  @Input() signatures: [Signature];
  @Input() sigStatus: string;

  @Input() focusOnSignature: boolean;


  focusCount = 0;

  constructor() { }


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

    if (this.wrappedForm.formWithLatestHistory['completedBySignature']) {
      return this.wrappedForm.formWithLatestHistory['completedBySignature'].date;
    } else {
      return null;
    }

  }

}
