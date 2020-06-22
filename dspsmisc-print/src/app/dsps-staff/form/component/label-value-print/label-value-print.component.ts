import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-label-value-print',
  templateUrl: './label-value-print.component.html',
  styleUrls: ['./label-value-print.component.scss']
})
export class LabelValuePrintComponent implements OnInit {

  @Input() value;
  @Input() label: string;
  @Input() controlType: 'checkbox' | 'text' | 'date';
  constructor() { }

  ngOnInit() {
  }

}
