import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormsService0 } from '../../forms0.service';
import { AccomplanForm } from '../component/accomplan.model';

@Component({
  selector: 'app-edit-accomplan',
  templateUrl: './edit-accomplan.page.html',
  styleUrls: ['./edit-accomplan.page.scss'],
})
export class EditAccomplanPage implements OnInit, OnDestroy {

  form: AccomplanForm;

  paramSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private formsService: FormsService0) { }

  ngOnInit() {
    this.paramSub = this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('formId')) {
        this.notFound();
        return;
      }

      const formId = paramMap.get('formId');

      this.form = this.formsService.getForm(formId, 'accomplan');
      if (!this.form) {
        this.notFound();
      }

    });
  }

  notFound() {
    console.log('no formId');
    this.navCtrl.navigateBack('/forms/accomplan');
    return;
  }

  ngOnDestroy() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }

}
