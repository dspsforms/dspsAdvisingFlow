import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseComponent } from '../../base-component';


@Component({
  selector: 'app-aap2header',
  templateUrl: './aap2header.component.html',
  styleUrls: ['./aap2header.component.scss'],
})
export class Aap2headerComponent extends BaseComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() grid: boolean;

  @Input() mode: 'create' | 'view' | 'edit';
  
  constructor() { 
    super();
  }

  ngOnInit() { }
  
  get studentEmail() {
    return this.form.get('studentEmail');
  }

}
