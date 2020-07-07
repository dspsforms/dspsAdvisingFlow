import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-progress-obj',
  templateUrl: './progress-obj.component.html',
  styleUrls: ['./progress-obj.component.scss'],
})
export class ProgressObjComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() grid: boolean;

  constructor() { }

  ngOnInit() {}

  get isReturningStudent() {
    return this.form.get(['progressObj', 'returningStudent']).value;
  }
}
