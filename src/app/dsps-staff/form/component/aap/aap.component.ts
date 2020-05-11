import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AbstractFormSubmit } from '../../abstract-form-submit';
import { FormName } from 'src/app/model/form.util';
import { Router } from '@angular/router';
import { FormsService } from '../../forms.service';
import { AppGlobalsService } from '../../app-globals.service';
import { LastOperationStatusService } from '../../last-operation-status.service';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-aap',
  templateUrl: './aap.component.html',
  styleUrls: ['./aap.component.scss'],
})
export class AapComponent extends AbstractFormSubmit implements OnInit, OnDestroy {

  @Input() formKey; // for view and edit
  @Input() wrappedForm: WrappedForm; // when form has data
  @Input() mode: 'create' | 'view' | 'edit';

  

  constructor(
    public router: Router,
    public formsService: FormsService,
    public appGlobalsService: AppGlobalsService,
    public lastOpStatusService: LastOperationStatusService,
    ) { 
      super(FormName.AAP, router, formsService, appGlobalsService, lastOpStatusService);
    }

  ngOnInit() {
    super.ngOnInit();
    this.initFormObj();
   }

  ionViewWillEnter() {
    super.ionViewWillEnter();
    this.initFormObj();
  }

  initFormObj() { 


    if (this.mode === 'view' || this.mode === 'edit') {
      this.initVal(this.form, this.wrappedForm.form);
    }

    if (this.mode === 'view') {
      this.disableForm(this.form);
    }
  }

}
