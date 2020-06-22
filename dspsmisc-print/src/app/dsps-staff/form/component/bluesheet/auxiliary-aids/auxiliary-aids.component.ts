import { Component, OnInit, Input } from '@angular/core';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-auxiliary-aids',
  templateUrl: './auxiliary-aids.component.html',
  styleUrls: ['./auxiliary-aids.component.scss'],
})
export class AuxiliaryAidsComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;

  constructor() { }

  ngOnInit() { }


}
