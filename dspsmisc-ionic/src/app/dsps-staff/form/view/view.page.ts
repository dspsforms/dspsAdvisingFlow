import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from '../forms.service';

import { AbstractFormRead } from '../abstract-form-read';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { IHasChanges } from 'src/app/util/has-changes.interface';


@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage extends AbstractFormRead implements OnInit, OnDestroy, IHasChanges {

  // one of the  Aap2 children that may have a form that is dirty but not yet saved
  containedForm: FormGroup;

  constructor(
    public route: ActivatedRoute,
    public formService: FormsService,
    public titleService: Title,
    public navCtrl: NavController) { 
    super(route, formService, titleService);
  }

  goToEditPage() {
    let url = `/dsps-staff/form/edit/${this.formInfo.formName}/${this.formInfo._id}`;
    console.log("editing url=", url);
    this.navCtrl.navigateForward(url);
    /*
    routerLink="'/dsps-staff/form/edit/' + formInfo.formName + '/' + formInfo._id"
    */
  }

  goToPrintPage() {

    const url = `${environment.printServer}/print/view/${this.formInfo.formName}/${this.formInfo._id}`;
    // window.location.href = url;
    window.open(url, "_blank");

  }

  // for Aap2 children
  receiveContainedForm(event) {
    console.log("contained form, presumably from an Aap2 child", event);
    this.containedForm = event;
  }

  hasChanges() {
    if (this.containedForm && this.containedForm.dirty) {
      return true;
    } else {
      return false;
    }
  }
}
