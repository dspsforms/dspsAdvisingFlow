import { Component, OnInit, OnDestroy, Input, Inject , forwardRef } from '@angular/core';
import { AbstractFormSubmit } from '../../abstract-form-submit';
import { FormName } from '../../../../model/form.util';
import { Router } from '@angular/router';
import { FormsService } from '../../forms.service';
// import { AppGlobalsService } from '../../app-globals.service';
// import { LastOperationStatusService } from '../../last-operation-status.service';
import { WrappedForm } from '../../../../model/wrapped-form.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../auth/auth.service';
// import { DataTransformService } from '../../data-transform.service';
import { FormValidators } from '../../form-validators';
import { UserService } from '../../../user/user.service';
import { DataTransformService } from '../../data-transform/data-transform.service';
import { AppGlobalsService } from '../../app-globals/app-globals.service';
import { LastOperationStatusService } from '../../last-operation-status/last-operation-status.service';

@Component({
  selector: 'app-aap1',
  templateUrl: './aap1.component.html',
  styleUrls: ['./aap1.component.scss'],
})
export class Aap1Component extends AbstractFormSubmit implements OnInit, OnDestroy {

  @Input() formKey; // for view and edit
  @Input() wrappedForm: WrappedForm; // when form has data
  @Input() mode: 'create' | 'view' | 'edit';

  @Input() focusOnSignature: boolean; // optional, if true, focus will be on signature


  constructor(
    router: Router,
    formsService: FormsService,
    authService: AuthService,
    dataTxformService: DataTransformService,
    appGlobalsService: AppGlobalsService,
    userService: UserService,
    lastOpStatusService: LastOperationStatusService,
    ) {
    super(
      FormName.AAP1,
      router,
      formsService,
      authService,
      dataTxformService,
      appGlobalsService,
      userService,
      lastOpStatusService);

    }

  ngOnInit() {
    super.ngOnInit();
    this.initFormObj();
  }

  initFormObj() {

    super.setWrappedFormFromDb(this.wrappedForm);

    // prod build fails
    // super.wrappedFormFromDb = this.wrappedForm;

  }

  showWrappedForm() {
    console.log(this.wrappedForm);
  }



}
