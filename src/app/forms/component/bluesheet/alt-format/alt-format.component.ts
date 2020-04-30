import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alt-format',
  templateUrl: './alt-format.component.html',
  styleUrls: ['./alt-format.component.scss'],
})
export class AltFormatComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() grid: boolean;
  constructor() { }

  ngOnInit() {}

}
