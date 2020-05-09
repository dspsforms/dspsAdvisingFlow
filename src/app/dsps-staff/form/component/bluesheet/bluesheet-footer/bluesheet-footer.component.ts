import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bluesheet-footer',
  templateUrl: './bluesheet-footer.component.html',
  styleUrls: ['./bluesheet-footer.component.scss'],
})
export class BluesheetFooterComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() grid: boolean;
  
  constructor() { }

  ngOnInit() {}

}
