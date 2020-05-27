import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-aap2header',
  templateUrl: './aap2header.component.html',
  styleUrls: ['./aap2header.component.scss'],
})
export class Aap2headerComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() grid: boolean;
  
  constructor() { }

  ngOnInit() { }
  
  get studentEmail() {
    return this.form.get('studentEmail');
  }

}
