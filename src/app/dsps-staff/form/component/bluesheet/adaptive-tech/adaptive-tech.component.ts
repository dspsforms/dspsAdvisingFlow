import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adaptive-tech',
  templateUrl: './adaptive-tech.component.html',
  styleUrls: ['./adaptive-tech.component.scss'],
})
export class AdaptiveTechComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() grid : boolean;

  constructor() { }

  ngOnInit() { }
 

}
