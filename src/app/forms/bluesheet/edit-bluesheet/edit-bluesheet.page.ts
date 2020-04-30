import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormsService } from '../../forms.service';
import { BlueSheetForm } from '../../component/bluesheet/model/bluesheet.model';

@Component({
  selector: 'app-edit-bluesheet',
  templateUrl: './edit-bluesheet.page.html',
  styleUrls: ['./edit-bluesheet.page.scss'],
})
export class EditBluesheetPage implements OnInit, OnDestroy {

  form: BlueSheetForm;

  paramSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private formsService: FormsService) { }

  ngOnInit() {
    this.paramSub = this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('formId')) {
        this.notFound();
        return;
      }

      const formId = paramMap.get('formId');

      this.form = this.formsService.getForm(formId, 'bluesheet');
      if (!this.form) {
        this.notFound();
      }

    });
  }

  notFound() {
    console.log('no formId');
    this.navCtrl.navigateBack('/forms/bluesheet');
    return;
  }

  ngOnDestroy() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }

}
