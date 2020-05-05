import { Component, OnInit } from '@angular/core';
import { FormsService0 } from '../forms0.service';
import { AccomplanForm } from './component/accomplan.model';

@Component({
  selector: 'app-accomplan',
  templateUrl: './accomplan.page.html',
  styleUrls: ['./accomplan.page.scss'],
})
export class AccomplanPage implements OnInit {

  listOfForms: AccomplanForm[];

  constructor(private formsService: FormsService0) { }

  ngOnInit() {
    this.listOfForms = this.formsService.accomplanForms ;
    console.log('listOfForms', this.listOfForms);
  }

}
