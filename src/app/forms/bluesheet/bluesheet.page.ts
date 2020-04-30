import { Component, OnInit } from '@angular/core';
import { FormsService } from '../forms.service';
import { BlueSheetForm } from '../component/bluesheet/model/bluesheet.model';

@Component({
  selector: 'app-bluesheet',
  templateUrl: './bluesheet.page.html',
  styleUrls: ['./bluesheet.page.scss'],
})
export class BluesheetPage implements OnInit {

  listOfForms: BlueSheetForm[];

  constructor(private formsService: FormsService) { }

  ngOnInit() {
    this.listOfForms = this.formsService.blueSheetForms;
    console.log('listOfForms', this.listOfForms);
  }

}
