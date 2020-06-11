import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractFormRead } from '../dsps-staff/form/abstract-form-read';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from '../dsps-staff/form/forms.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-print-view',
  templateUrl: './print-view.page.html',
  styleUrls: ['./print-view.page.scss'],
})
export class PrintViewPage extends AbstractFormRead implements OnInit, OnDestroy {

  // This was an experiment -- but it doesn't work
  // Whatever is on the page is visible. The rest are not.
  constructor(
    public route: ActivatedRoute,
    public formService: FormsService,
    public navCtrl: NavController,
  ) { 
    super(route, formService);
  }

  // this too prints only the first page

  // onPrint() {
  //   console.log('before print');
  //   this.printService.print("printcontainer");
  //   console.log('after print');
  // }

}
