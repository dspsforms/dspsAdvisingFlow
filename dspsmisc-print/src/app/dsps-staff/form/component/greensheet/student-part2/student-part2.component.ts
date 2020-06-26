import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-student-part2',
  templateUrl: './student-part2.component.html',
  styleUrls: ['./student-part2.component.scss'],
})
export class StudentPart2Component implements OnInit {

  @Input() wrappedForm: WrappedForm;
  constructor() { }

  ngOnInit() {}

}
