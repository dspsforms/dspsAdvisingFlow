import { Component, OnInit } from '@angular/core';
import { FormsService } from '../forms.service';
import { AccomplanForm } from './component/accomplan.model';

@Component({
  selector: 'app-accomplan',
  templateUrl: './accomplan.page.html',
  styleUrls: ['./accomplan.page.scss'],
})
export class AccomplanPage implements OnInit {

  listOfForms: AccomplanForm[];

  constructor(private formsService: FormsService) { }

  ngOnInit() {
    this.listOfForms = this.formsService.accomplanForms ;
    console.log('listOfForms', this.listOfForms);
  }

}
