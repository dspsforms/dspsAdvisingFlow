import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AbstractFormSubmit } from '../../../abstract-form-submit';
import { FormName } from 'src/app/model/form.util';
import { Router } from '@angular/router';
import { FormsService } from '../../../forms.service';
import { AuthService } from 'src/app/auth/auth.service';

import { UserService } from 'src/app/dsps-staff/user/user.service';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { AuthData } from 'src/app/auth/auth-data.model';
import { DataTransformService } from '../../../data-transform/data-transform.service';
import { AppGlobalsService } from '../../../app-globals/app-globals.service';
import { LastOperationStatusService } from '../../../last-operation-status/last-operation-status.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-aap2-child',
  templateUrl: './aap2-child.component.html',
  styleUrls: ['./aap2-child.component.scss'],
})
export class Aap2ChildComponent extends AbstractFormSubmit implements OnInit, OnDestroy  {

  @Input() formKey; // for view and edit
  @Input() wrappedForm: WrappedForm; // when form has data
  @Input() mode: 'create' | 'view' | 'edit';

  // parentFormData has values for lastName, firstName, etc.
  @Input() parentFormData: any; // WrappedForm | FormGroup;

  @Input() studentUser: AuthData;

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
    super(FormName.AAP2_CHILD,
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

  // initFromParentFormData() {
  //   if (!this.parentFormData) { return; }

  //   // let super know there is a parent. so it adds parentId to form
  //   // before saving it
  //   super.parentFormDataCopy = this.parentFormData;

  //   // this.form.get('studentLastName').setValue(
  //   //   this.parentFormData.formWithLatestHistory['studentLastName'].val);

  //   // parentFormData is a FormGroup when the parent was just created.
  //   // it's a WrappedForm when it's brought back from db
  //   // if (this.parentFormData instanceof WrappedForm) {
  //   if (this.parentFormData.formWithLatestHistory) {
  //     const parentData = this.parentFormData as WrappedForm;
  //     ['studentLastName', 'studentFirstName', 'collegeId', 'studentEmail'].forEach(fieldName => {
  //       this.form.get(fieldName).setValue(
  //         parentData.formWithLatestHistory[fieldName].val);
  //     });
  //   } else  { // this.parentFormData instanceof FormGroup)
  //     const parentData = this.parentFormData as FormGroup;
  //     ['studentLastName', 'studentFirstName', 'collegeId', 'studentEmail'].forEach(fieldName => {
  //       this.form.get(fieldName).setValue(
  //         parentData.get[fieldName]);
  //     });
  //   }
  // }

  ngOnInit() {
    super.ngOnInit();
    this.initFormObj();
  }

  initFormObj() {


    super.setWrappedFormFromDb(this.wrappedForm);

  }


  // BaseComponent has this, but we can extend only one class
  showRequired(mode: 'create' | 'view' | 'edit') {
    if (mode && mode === 'create' || mode === 'edit') {
      return true;
    } else {
      return false;
    }
  }

  onSigned(event) {
    console.log("app2-child: onSigned:", event);
  }
}
