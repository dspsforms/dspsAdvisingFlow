import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-progress-obj-part2',
  templateUrl: './progress-obj-part2.component.html',
  styleUrls: ['./progress-obj-part2.component.scss'],
})
export class ProgressObjPart2Component implements OnInit {

  @Input() form: FormGroup;
  @Input() grid: boolean;

  constructor() { }

  ngOnInit() {}

}
