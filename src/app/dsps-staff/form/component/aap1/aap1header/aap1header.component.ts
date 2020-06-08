import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data.model';

import { BaseComponent } from '../../base-component';

@Component({
  selector: 'app-aap1header',
  templateUrl: './aap1header.component.html',
  styleUrls: ['./aap1header.component.scss'],
})
export class Aap1headerComponent extends BaseComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() userList: AuthData[];
  @Input() mode: 'create' | 'view' | 'edit';
  
  constructor() { 
    super();
   }

  ngOnInit() { }
  
  get studentEmail() {
    return this.form.get('studentEmail');
  }

}
