import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AbstractFormSubmit } from '../../abstract-form-submit';
import { Router } from '@angular/router';
import { FormsService } from '../../forms.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DataTransformService } from '../../data-transform.service';
import { AppGlobalsService } from '../../app-globals.service';
import { LastOperationStatusService } from '../../last-operation-status.service';
import { FormName } from 'src/app/model/form.util';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

@Component({
  selector: 'app-aap2',
  templateUrl: './aap2.component.html',
  styleUrls: ['./aap2.component.scss'],
})
export class Aap2Component extends AbstractFormSubmit implements OnInit, OnDestroy {

  @Input() formKey; // for view and edit
  @Input() wrappedForm: WrappedForm; // when form has data
  @Input() mode: 'create' | 'view' | 'edit';


  constructor(
    public router: Router,
    public formsService: FormsService,
    public authService: AuthService,
    public dataTxformService: DataTransformService,
    public appGlobalsService: AppGlobalsService,
    public lastOpStatusService: LastOperationStatusService,
    ) { 
    super(FormName.AAP2,
      router,
      formsService,
      authService,
      dataTxformService,
      appGlobalsService,
      lastOpStatusService);
    
  }

  ngOnInit() {
    super.ngOnInit();
    this.initFormObj();
   }

  ionViewWillEnter() {
    super.ionViewWillEnter();
    this.initFormObj();
  }

  // TODO
  initFormObj() {

    // TODO create form model

    if (this.mode === 'view' || this.mode === 'edit') {
      this.initVal(this.form, this.wrappedForm.form);
    }

    if (this.mode === 'view') {
      this.disableForm(this.form);
    }
  } 

  createOrEditForm() {
    console.log("createOrEditForm ", this.formName, "  ", this.form.value);

    if (!this.form.valid) {
      // may be saved as a draft later.
      return;
    }

    if (this.mode === 'create') {
      super.createForm();
    } else if (this.mode === 'edit') {
      super.editForm(this.formKey);
    }
  }

}
