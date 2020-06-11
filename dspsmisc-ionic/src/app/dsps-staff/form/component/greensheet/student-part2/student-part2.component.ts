import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-part2',
  templateUrl: './student-part2.component.html',
  styleUrls: ['./student-part2.component.scss'],
})
export class StudentPart2Component implements OnInit {

  @Input() form: FormGroup;
  @Input() grid: boolean;
  constructor() { }

  ngOnInit() {}

}
