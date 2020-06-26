import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-label-yes-no',
  templateUrl: './label-yes-no.component.html',
  styleUrls: ['./label-yes-no.component.scss'],
})
export class LabelYesNoComponent implements OnInit {


  @Input() value;
  @Input() label;
  // @Input() colSpan; // optional


  constructor() { }

  ngOnInit() {

  }

  // get colSpan2Use() {
  //   if (this.colSpan) { return this.colSpan; }
  //   else { return 1; }
  // }

}
