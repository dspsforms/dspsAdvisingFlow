import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data.model';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss'],
})
export class FacilitiesComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() userList: AuthData[];
  
  constructor() { }

  ngOnInit() {}

}
