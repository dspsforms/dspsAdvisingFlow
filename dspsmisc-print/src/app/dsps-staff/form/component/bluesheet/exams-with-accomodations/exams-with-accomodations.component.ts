import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-exams-with-accomodations',
  templateUrl: './exams-with-accomodations.component.html',
  styleUrls: ['./exams-with-accomodations.component.scss'],
})
export class ExamsWithAccomodationsComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;

  constructor() { }

  ngOnInit() { }


}
