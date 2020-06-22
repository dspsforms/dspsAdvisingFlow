import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-adaptive-tech',
  templateUrl: './adaptive-tech.component.html',
  styleUrls: ['./adaptive-tech.component.scss'],
})
export class AdaptiveTechComponent implements OnInit {

  @Input() wrappedForm: WrappedForm;

  constructor() { }

  ngOnInit() { }


}
