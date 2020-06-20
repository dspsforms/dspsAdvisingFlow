import { Component, OnInit, Input } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data.model';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-visual-aids',
  templateUrl: './visual-aids.component.html',
  styleUrls: ['./visual-aids.component.scss'],
})
export class VisualAidsComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;
  @Input() userList: AuthData[];

  constructor() { }

  ngOnInit() {}

}
