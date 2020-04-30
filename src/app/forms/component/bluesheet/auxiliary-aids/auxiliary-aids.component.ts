import { Component, OnInit, Input } from '@angular/core';
import { AppGlobals } from 'src/app/forms/globals';

@Component({
  selector: 'app-auxiliary-aids',
  templateUrl: './auxiliary-aids.component.html',
  styleUrls: ['./auxiliary-aids.component.scss'],
})
export class AuxiliaryAidsComponent implements OnInit {

  @Input() form;
  @Input() grid;
  constructor() { }

  ngOnInit() { }


}
