import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-disability-services-container',
  templateUrl: './disability-services-container.component.html',
  styleUrls: ['./disability-services-container.component.scss'],
})
export class DisabilityServicesContainerComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;

  constructor() { }

  ngOnInit() {}

}
