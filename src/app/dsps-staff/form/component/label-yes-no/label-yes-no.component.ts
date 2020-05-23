import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-label-yes-no',
  templateUrl: './label-yes-no.component.html',
  styleUrls: ['./label-yes-no.component.scss'],
})
export class LabelYesNoComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() secondaryGroup: string;
  @Input() controlName;
  @Input() label;

  // @Input() isDisabled = false;
 
 
  constructor() { }

  ngOnInit() {

   }
  
  onChangeHandler() {
    // console.log(this.label, this.form.get(this.secondaryGroup).get(this.controlName));
  }

  // for ion-radio, even if the corresponding formControl is disabled, the ion-radio is not. 
  get isDisabled() {
    return this.form.get(this.secondaryGroup).get(this.controlName).disabled;
  }
}
