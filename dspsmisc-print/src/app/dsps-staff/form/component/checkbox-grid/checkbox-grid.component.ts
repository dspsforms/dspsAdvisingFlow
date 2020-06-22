import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox-grid',
  templateUrl: './checkbox-grid.component.html',
  styleUrls: ['./checkbox-grid.component.scss']
})
export class CheckboxGridComponent implements OnInit {

  @Input() value;
  @Input() label;

  constructor() { }

  ngOnInit() {
  }

}
