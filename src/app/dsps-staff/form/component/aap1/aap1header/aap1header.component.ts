import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-aap1header',
  templateUrl: './aap1header.component.html',
  styleUrls: ['./aap1header.component.scss'],
})
export class Aap1headerComponent implements OnInit {

  @Input() form: FormGroup;
  constructor() { }

  ngOnInit() {}

}
