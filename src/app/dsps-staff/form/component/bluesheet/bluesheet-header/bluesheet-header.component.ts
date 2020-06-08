import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '../../base-component';

@Component({
  selector: 'app-bluesheet-header',
  templateUrl: './bluesheet-header.component.html',
  styleUrls: ['./bluesheet-header.component.scss'],
})
export class BluesheetHeaderComponent extends BaseComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() mode: 'create' | 'view' | 'edit';

  constructor() {
    super();
   }

  ngOnInit() { }

  get studentEmail() {
    return this.form.get('studentEmail');
  }


}
