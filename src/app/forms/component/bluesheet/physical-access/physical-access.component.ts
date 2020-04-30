import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-physical-access',
  templateUrl: './physical-access.component.html',
  styleUrls: ['./physical-access.component.scss'],
})
export class PhysicalAccessComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() grid: boolean;
  
  constructor() { }

  ngOnInit() {}

}
