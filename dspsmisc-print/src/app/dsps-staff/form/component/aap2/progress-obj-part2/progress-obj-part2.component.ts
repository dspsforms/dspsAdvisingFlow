import { Component, OnInit, Input } from '@angular/core';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-progress-obj-part2',
  templateUrl: './progress-obj-part2.component.html',
  styleUrls: ['./progress-obj-part2.component.scss'],
})
export class ProgressObjPart2Component implements OnInit {

  @Input() wrappedForm: WrappedForm;

  constructor() { }

  ngOnInit() {}

}
