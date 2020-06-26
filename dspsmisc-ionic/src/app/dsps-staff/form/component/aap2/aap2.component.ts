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
import { UserService } from 'src/app/dsps-staff/user/user.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { FormValidators } from '../../form-validators';

@Component({
  selector: 'app-aap2',
  templateUrl: './aap2.component.html',
  styleUrls: ['./aap2.component.scss'],
})
export class Aap2Component extends AbstractFormSubmit implements OnInit, OnDestroy {

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
    ) { 
    super(FormName.AAP2,
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

  ionViewWillEnter() {
    super.ionViewWillEnter();
    this.initFormObj();
  }

  // TODO
  initFormObj() {

    // TODO create form model

    this.form = new FormGroup({
      
      /*
      * (version, completedByUserId, completedByDate)
      * version is not editable by user.  
      * if create, initialize to 0. if edit, initialize with data from server.
      * it will be incremented before submit
      */

      // version: new FormControl(0, { updateOn: 'change' }), 
      // completedByUserId: new FormControl(null, { updateOn: 'change' }), // automatic -- hidden
      // completedByDate: new FormControl(null, { updateOn: 'change' }), // automatic -- hidden

      // where there are validators, updateOn blur. else, updateOn change
      studentLastName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      studentFirstName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      collegeId: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.required, FormValidators.collegeIdFormat]
      }),
      studentEmail: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.email]
      }),
      completedBySignature: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }), // signature, shown to user
      // student sig also needed

      progressObj: new FormGroup({
        // Progress Objectives
        semYear: new FormControl(null, { updateOn: 'change' }),
        studentType: new FormControl(false, { updateOn: 'change' }), // radio new student/returning student
        edOrOtherGoal: new FormControl(null, { updateOn: 'change' }),
        edAssistanceThisSem: new FormControl(false, { updateOn: 'change' }), // radio Yes/No
        courseNames: new FormControl(null, { updateOn: 'change' }),
        progressEAC: new FormControl(null, { updateOn: 'change' }),
        genProgress: new FormControl(null, { updateOn: 'change' }),
      }),

    });

    if (this.mode === 'view' || this.mode === 'edit') {
      this.initVal(
        this.form,
        this.wrappedForm.formWithLatestHistory,
        this.wrappedForm.formHistoryArr);

      // supply the historical form data to super
      super.wrappedFormFromDb = this.wrappedForm;
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
