import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { AbstractFormSubmit } from '../../abstract-form-submit';
import { Router } from '@angular/router';
import { FormsService } from '../../forms.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/dsps-staff/user/user.service';
import { FormName } from 'src/app/model/form.util';
import { DataTransformService } from '../../data-transform/data-transform.service';
import { AppGlobalsService } from '../../app-globals/app-globals.service';
import { LastOperationStatusService } from '../../last-operation-status/last-operation-status.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-greensheet',
  templateUrl: './greensheet.component.html',
  styleUrls: ['./greensheet.component.scss'],
})
export class GreensheetComponent extends AbstractFormSubmit implements OnInit, OnDestroy  {

  @Input() formKey; // for view and edit
  @Input() wrappedForm: WrappedForm; // when form has data
  @Input() mode: 'create' | 'view' | 'edit';

  constructor(
    public router: Router,
    public formsService: FormsService,
    public authService: AuthService,
    public dataTxformService: DataTransformService,
    public appGlobalsService: AppGlobalsService,
    public userService: UserService,
    public lastOpStatusService: LastOperationStatusService,
    public titleService: Title
    ) {
    super(FormName.GREENSHEET,
      router,
      formsService,
      authService,
      dataTxformService,
      appGlobalsService,
      userService,
      lastOpStatusService,
      titleService
      );

  }

  ngOnInit() {
    super.ngOnInit();
    this.initFormObj();
   }


  initFormObj() {

    super.setWrappedFormFromDb(this.wrappedForm);

    // prod build fails. only public and protected methods accessible
    // super.wrappedFormFromDb = this.wrappedForm;
  }





}
