import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-required-field-prompt',
  templateUrl: './required-field-prompt.component.html',
  styleUrls: ['./required-field-prompt.component.scss'],
})
export class RequiredFieldPromptComponent implements OnInit {

  @Input() showRequired;
  
  constructor() { }

  ngOnInit() {}

}
