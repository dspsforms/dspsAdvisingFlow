import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spaced-icon',
  templateUrl: './spaced-icon.component.html',
  styleUrls: ['./spaced-icon.component.scss'],
})
export class SpacedIconComponent implements OnInit {

  @Input() name;
  constructor() { }

  ngOnInit() {}

}
