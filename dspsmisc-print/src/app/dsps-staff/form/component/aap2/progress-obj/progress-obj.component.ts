import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { AuthData } from 'src/app/auth/auth-data.model';

@Component({
  selector: 'app-progress-obj',
  templateUrl: './progress-obj.component.html',
  styleUrls: ['./progress-obj.component.scss'],
})
export class ProgressObjComponent implements OnInit  {

  @Input() wrappedForm: WrappedForm;

  @ViewChild('semYear', { static: true }) semYear: ElementRef;

  constructor() { }

  ngOnInit() {

    console.log("progress-obj, wrappedForm", this.wrappedForm);
    let foo;
    let bar;

    try {
      if (this.wrappedForm) {
        bar = 'semYear';
        foo = this.wrappedForm.formWithLatestHistory['progressObj']['semYear'].val;


        bar = 'returningStudent';
        foo = this.wrappedForm.formWithLatestHistory['progressObj']['returningStudent'].val;


        bar = 'progress';
        foo = this.wrappedForm.formWithLatestHistory['progressObj']['progress'].val;

        bar = 'refer2Transcripts';
        foo = this.wrappedForm.formWithLatestHistory['progressObj']['refer2Transcripts'].val;

        bar = 'refer2Grades';
        foo = this.wrappedForm.formWithLatestHistory['progressObj']['refer2Grades'].val;

        bar = 'refer2Other';
        foo = this.wrappedForm.formWithLatestHistory['progressObj']['refer2Other'].val;

      }

    } catch (err) {
      console.log("bar", bar);
      console.log(err);
    }
  }

  get isReturningStudent() {
    // return this.form.get(['progressObj', 'returningStudent']).value;

    if (!this.wrappedForm) { return false; }
    return this.wrappedForm.formWithLatestHistory['progressObj']['returningStudent'].val;
  }
}
