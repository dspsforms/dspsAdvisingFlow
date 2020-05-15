import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-written-course-req',
  templateUrl: './written-course-req.component.html',
  styleUrls: ['./written-course-req.component.scss'],
})
export class WrittenCourseReqComponent implements OnInit , OnChanges{

  @Input() form: FormGroup;

  refToData = { foo: 1 };
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("refToData", this.refToData);
  }

  ngOnInit() {}

}
