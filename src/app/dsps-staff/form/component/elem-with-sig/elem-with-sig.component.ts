import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-elem-with-sig',
  templateUrl: './elem-with-sig.component.html',
  styleUrls: ['./elem-with-sig.component.scss'],
})
export class ElemWithSigComponent implements OnInit, OnChanges{

  @Input() form: FormGroup;

  // name of sub group within form
  @Input() formGroupName: string;

  // name of the formGroup control
  @Input() controlName: string; 

  @Input() controlType: 'checkbox' | 'text';

  @Input() label: string;

  @Input() refToData;  // a reference so data can be written to it.

  @Input() completedByName;

  date2Use: Date;

  origValue;
  isCheckbox;

  constructor() { }

  ngOnInit() { 

    this.origValue = this.form.get(this.formGroupName).get(this.controlName).value;

    this.isCheckbox = this.controlType === 'checkbox';
  
    this.date2Use = new Date();
    
  }

  get valueChanged() {
    if (this.isCheckbox) {
      return this.checkboxClickCount % 2 !== 0; // odd true, even false
    } else {
      // origValue may be null. check for both null and empty string
      return ! (
        this.origValue === this.form.get(this.formGroupName).get(this.controlName).value ||
        '' === this.form.get(this.formGroupName).get(this.controlName).value.trim())
        ;
    }
  }


  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (this.form.get(this.formGroupName).get(this.controlName).dirty) {
      this.refToData['myData'] = { value: 'changed' };
      
    }
    console.log(this.form);
  }

  // if this is even, value is same as orig value (for checkbox)
  checkboxClickCount = 0;

  

  clicked() {
    this.checkboxClickCount++;
    console.log("changeCounter", this.checkboxClickCount);
    console.log(this.form);

  }

}
