import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthData } from 'src/app/auth/auth-data.model';

@Component({
  selector: 'app-visual-aids',
  templateUrl: './visual-aids.component.html',
  styleUrls: ['./visual-aids.component.scss'],
})
export class VisualAidsComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() userList: AuthData[];
  
  constructor() { }

  ngOnInit() {}

}
