import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from '../forms.service';

import { AbstractFormRead } from '../abstract-form-read';


@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage extends AbstractFormRead implements OnInit, OnDestroy {

  constructor(
    public route: ActivatedRoute,
    public formService: FormsService,
    public navCtrl: NavController) { 
    super(route, formService);
  }

  goToEditPage() {
    let url = `/dsps-staff/form/edit/${this.formInfo.formName}/${this.formInfo._id}`;
    console.log("editing url=", url);
    this.navCtrl.navigateForward(url);
    /*
    routerLink="'/dsps-staff/form/edit/' + formInfo.formName + '/' + formInfo._id"
    */
  }
}
