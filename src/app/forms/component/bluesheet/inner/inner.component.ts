import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inner',
  templateUrl: './inner.component.html',
  styleUrls: ['./inner.component.scss'],
})
export class InnerComponent implements OnInit {

  @Input() form;
  
  constructor() { }

  ngOnInit() {}

}
