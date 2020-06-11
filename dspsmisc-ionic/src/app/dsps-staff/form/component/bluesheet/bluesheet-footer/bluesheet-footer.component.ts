import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseComponent } from '../../base-component';

@Component({
  selector: 'app-bluesheet-footer',
  templateUrl: './bluesheet-footer.component.html',
  styleUrls: ['./bluesheet-footer.component.scss'],
})
export class BluesheetFooterComponent extends BaseComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() grid: boolean;

  @Input() mode: 'create' | 'view' | 'edit';
  
  constructor() { 
    super();
  }

  ngOnInit() {}

}
