import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-exams-with-accomodations',
  templateUrl: './exams-with-accomodations.component.html',
  styleUrls: ['./exams-with-accomodations.component.scss'],
})
export class ExamsWithAccomodationsComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() grid : boolean;
  constructor() { }

  ngOnInit() { }

}
