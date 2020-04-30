import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormsService } from '../../forms.service';
import { Subscription } from 'rxjs';
import { BlueSheetForm } from '../../component/bluesheet/model/bluesheet.model';

@Component({
  selector: 'app-view-bluesheet',
  templateUrl: './view-bluesheet.page.html',
  styleUrls: ['./view-bluesheet.page.scss'],
})
export class ViewBluesheetPage implements OnInit, OnDestroy {

  form: BlueSheetForm;

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

      this.form = this.formsService.getForm(formId, 'bluesheet');
      if (!this.form) {
        console.log('no form found for form.id=', formId);
        this.notFound();
      }

    });
  }

  notFound() {
    this.navCtrl.navigateBack('/forms/bluesheet');
    return;
  }

  ngOnDestroy() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }

}
