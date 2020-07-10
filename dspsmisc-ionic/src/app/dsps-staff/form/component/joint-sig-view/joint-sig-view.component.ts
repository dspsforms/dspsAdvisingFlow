import { Component, OnInit, Input, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Signature } from 'src/app/model/signature.model';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-joint-sig-view',
  templateUrl: './joint-sig-view.component.html',
  styleUrls: ['./joint-sig-view.component.scss'],
})
export class JointSigViewComponent implements OnInit {

  @Input() wrappedForm: WrappedForm; // for completedBy
  @Input() signatures: [Signature];
  @Input() sigStatus: string;

  // @Input() focusOnSignature: boolean;
  

  // @ViewChild('sigCards', { static: true }) sigCards: ElementRef;
  // focusCount = 0;

  constructor() { }

  // there will be multiple signatures for AAP2 and AAP2_CHILD
  // if ViewChild has to be used, can't use the same #sigCards on all of them
  // ngOnChanges(changes: SimpleChanges): void {

  //   console.log("focusOnSignatur before=", this.focusOnSignature);

  //   // don't keep focusing here. keep a count and stop focussing if focusHere keeps changing
  //   if (this.focusOnSignature && this.focusCount < 2
  //     && this.sigCards && this.sigCards.nativeElement) {
  //     console.log("setting focus on sigCards");
  //     this.sigCards.nativeElement.focus();
  //     this.focusCount++;
  //   }
  // }

  ngOnInit() { }
  
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
