import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-disability-services-container',
  templateUrl: './disability-services-container.component.html',
  styleUrls: ['./disability-services-container.component.scss'],
})
export class DisabilityServicesContainerComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() grid: boolean;
  
  constructor() { }

  ngOnInit() {}

}
