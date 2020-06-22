import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-physical-access',
  templateUrl: './physical-access.component.html',
  styleUrls: ['./physical-access.component.scss'],
})
export class PhysicalAccessComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;
  constructor() { }

  ngOnInit() {}

}
