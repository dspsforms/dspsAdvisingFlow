import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-disability-services',
  templateUrl: './disability-services.component.html',
  styleUrls: ['./disability-services.component.scss'],
})
export class DisabilityServicesComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;
  @Input() controlName: string;
  @Input() title: string;

  labels = {};

  constructor() { }

  ngOnInit() {
    /*
        acquiredBrainInjury
        adhd
        autismSpectrum
        blindLowVision
        deafHardOfHearing
        intellectualDisability
        learningDisabled
        mentalHealthDisabilty
        physicalDisability
        other
    */
    this.labels['acquiredBrainInjury'] = 'Acquired Brain Injury';
    this.labels['adhd'] = 'Attention Deficit Hyperactivity Disorder';
    this.labels['autismSpectrum'] = 'Autism Spectrum Disorder';
    this.labels['blindLowVision'] = 'Blind and Low Vision';
    this.labels['deafHardOfHearing'] = 'Deaf and Hard of Hearing';
    this.labels['intellectualDisability'] = 'Intellectual Disability';
    this.labels['learningDisabled'] = 'Learning Disabled';
    this.labels['mentalHealthDisabilty'] = 'Mental Health Disability';
    this.labels['physicalDisability'] = 'Physical Disability';
    this.labels['other'] = 'Other';

    // this.labels['other'] = 'Other';

  }

  get allKeys() {
    return Object.keys(this.labels);
  }

}
