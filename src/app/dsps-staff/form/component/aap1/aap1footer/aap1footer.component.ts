import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data.model';


@Component({
  selector: 'app-aap1footer',
  templateUrl: './aap1footer.component.html',
  styleUrls: ['./aap1footer.component.scss'],
})
export class Aap1footerComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() userList: AuthData[];

  constructor() { }

  ngOnInit() {}

}
