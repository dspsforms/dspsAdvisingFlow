import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractFormSubmit } from '../../abstract-form-submit';
import { FormName } from 'src/app/model/form.util';
import { FormsService } from '../../forms.service';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/dsps-staff/user/user.service';
import { DataTransformService } from '../../data-transform/data-transform.service';
import { AppGlobalsService } from '../../app-globals/app-globals.service';
import { LastOperationStatusService } from '../../last-operation-status/last-operation-status.service';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-bluesheet',
  templateUrl: './bluesheet.component.html',
  styleUrls: ['./bluesheet.component.scss'],
})
export class BluesheetComponent extends AbstractFormSubmit implements OnInit, OnDestroy {

  @Input() formKey; // for view and edit
  @Input() wrappedForm: WrappedForm; // when form has data
  @Input() mode: 'create' | 'view' | 'edit';

  @Input() focusOnSignature: boolean; // optional, if true, focus will be on signature


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
    super(FormName.BLUESHEET,
      router,
      formsService,
      authService,
      dataTxformService,
      appGlobalsService,
      userService,
      lastOpStatusService,
      titleService );
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
