import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-progress-obj',
  templateUrl: './progress-obj.component.html',
  styleUrls: ['./progress-obj.component.scss'],
})
export class ProgressObjComponent implements OnInit, AfterViewInit  {

  @Input() form: FormGroup;
  @Input() grid: boolean;
  @Input() mode: 'create' | 'view' | 'edit'

  @ViewChild('semYear', { static: true }) semYear: ElementRef;

  constructor() { }

  ngOnInit() {

    // console.log("in progress-obj-ngOnInit");
    // if (this.semYear && this.semYear.nativeElement) {
    //   console.log("setting focus on semYear");
    //   this.semYear.nativeElement.focus();
    // }
  }

  ngAfterViewInit() {
      // if (this.semYear && this.semYear.nativeElement) {
      //   console.log("setting focus on newProgress");
      //   this.semYear.nativeElement.focus();
      // }
   
    if (this.mode === 'create') { 
      console.log("in progress-obj-ngAfterViewInit");
      setTimeout(() => {
          if (this.semYear && this.semYear.nativeElement) {
            console.log("setting focus on semYear");
            this.semYear.nativeElement.focus();
          }
      }, 400);
    }
  
  }

  ionViewWillEnter() {
    
  }

  get isReturningStudent() {
    return this.form.get(['progressObj', 'returningStudent']).value;
  }
}
