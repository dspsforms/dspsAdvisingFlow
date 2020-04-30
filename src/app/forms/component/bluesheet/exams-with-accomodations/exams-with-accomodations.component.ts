import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppGlobals } from 'src/app/forms/globals';

@Component({
  selector: 'app-exams-with-accomodations',
  templateUrl: './exams-with-accomodations.component.html',
  styleUrls: ['./exams-with-accomodations.component.scss'],
})
export class ExamsWithAccomodationsComponent implements OnInit {

  @Input() form;
  @Input() grid;
  constructor() { }

  ngOnInit() { }

}
