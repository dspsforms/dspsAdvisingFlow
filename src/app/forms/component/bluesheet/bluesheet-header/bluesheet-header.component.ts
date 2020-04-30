import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bluesheet-header',
  templateUrl: './bluesheet-header.component.html',
  styleUrls: ['./bluesheet-header.component.scss'],
})
export class BluesheetHeaderComponent implements OnInit {

  @Input() form: FormGroup;
  constructor() { }

  ngOnInit() { }
 

}
