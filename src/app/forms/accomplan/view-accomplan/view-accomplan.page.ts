import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormsService } from '../../forms.service';
import { AccomplanForm } from '../component/accomplan.model';

@Component({
  selector: 'app-view-accomplan',
  templateUrl: './view-accomplan.page.html',
  styleUrls: ['./view-accomplan.page.scss'],
})
export class ViewAccomplanPage implements OnInit, OnDestroy {

  form: AccomplanForm;

  paramSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private formsService: FormsService) { }

  ngOnInit() {
    this.paramSub = this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('formId')) {
        console.log('no formId param');
        this.notFound();
        return;
      }

      const formId = paramMap.get('formId');

      this.form = this.formsService.getForm(formId, 'accomplan');
      if (!this.form) {
        console.log('no form found for form.id=', formId);
        this.notFound();
      }

    });
  }

  notFound() {
    this.navCtrl.navigateBack('/forms/accomplan');
    return;
  }

  ngOnDestroy() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }

}
