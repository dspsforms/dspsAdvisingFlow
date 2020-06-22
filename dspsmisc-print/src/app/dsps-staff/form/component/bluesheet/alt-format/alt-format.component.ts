import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-alt-format',
  templateUrl: './alt-format.component.html',
  styleUrls: ['./alt-format.component.scss'],
})
export class AltFormatComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;
  constructor() { }

  ngOnInit() {}

}
