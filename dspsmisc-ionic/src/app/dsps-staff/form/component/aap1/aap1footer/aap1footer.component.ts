import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data.model';

import { BaseComponent } from '../../base-component';


@Component({
  selector: 'app-aap1footer',
  templateUrl: './aap1footer.component.html',
  styleUrls: ['./aap1footer.component.scss'],
})
export class Aap1footerComponent extends BaseComponent  implements OnInit {

  @Input() form: FormGroup;
  @Input() userList: AuthData[];

  @Input() mode: 'create' | 'view' | 'edit';

  constructor() {
    super();
   }

  ngOnInit() {}

}
