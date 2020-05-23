import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-progress-obj-part1',
  templateUrl: './progress-obj-part1.component.html',
  styleUrls: ['./progress-obj-part1.component.scss'],
})
export class ProgressObjPart1Component implements OnInit {

  @Input() form: FormGroup;
  @Input() grid: boolean;

  constructor() { }

  ngOnInit() { }
  
  // for ion-radio, even if the corresponding formControl is disabled, the ion-radio is not. 
  get isDisabled() {
    return this.form.get('progressObj').get('studentType').disabled;
  }

  onChangeHandler() {
    // console.log(this.form.get('progressObj').get('studentType'));
  }

}
