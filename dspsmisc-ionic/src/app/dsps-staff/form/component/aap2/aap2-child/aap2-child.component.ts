import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AbstractFormSubmit } from '../../../abstract-form-submit';
import { FormName } from 'src/app/model/form.util';
import { Router } from '@angular/router';
import { FormsService } from '../../../forms.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DataTransformService } from '../../../data-transform.service';
import { AppGlobalsService } from '../../../app-globals.service';
import { UserService } from 'src/app/dsps-staff/user/user.service';
import { LastOperationStatusService } from '../../../last-operation-status.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { WrappedForm } from 'src/app/model/wrapped-form.model';

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
    super(FormName.AAP2_CHILD,
      router,
      formsService,
      authService,
      dataTxformService,
      appGlobalsService,
      userService,
      lastOpStatusService);
    
  }

  initFromParentFormData() {
    if (!this.parentFormData) { return; }

    // let super know there is a parent. so it adds parentId to form
    // before saving it
    super.parentFormDataCopy = this.parentFormData;

    // this.form.get('studentLastName').setValue(
    //   this.parentFormData.formWithLatestHistory['studentLastName'].val);

    // parentFormData is a FormGroup when the parent was just created.
    // it's a WrappedForm when it's brought back from db
    // if (this.parentFormData instanceof WrappedForm) {
    if (this.parentFormData.formWithLatestHistory) {
      const parentData = this.parentFormData as WrappedForm;
      ['studentLastName', 'studentFirstName', 'collegeId', 'studentEmail'].forEach(fieldName => {
        this.form.get(fieldName).setValue(
          parentData.formWithLatestHistory[fieldName].val);
      });
    } else  { // this.parentFormData instanceof FormGroup)
      const parentData = this.parentFormData as FormGroup;
      ['studentLastName', 'studentFirstName', 'collegeId', 'studentEmail'].forEach(fieldName => {
        this.form.get(fieldName).setValue(
          parentData.get[fieldName]);
      });
    }
    
    
  }
  
  ngOnInit() {
    super.ngOnInit();
    this.initFormObj();
  }
  
  initFormObj() {

    // TODO create form model

    this.form = new FormGroup({
      // these will come from parent
      studentLastName: new FormControl(null),
      studentFirstName: new FormControl(null),
      collegeId: new FormControl( null),
      studentEmail: new FormControl(null),
      
      // following will be part of the form
      completedBySignature: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }), 

      // TODO update these with latest requirments
      progressObj: new FormGroup({
        // Progress Objectives
        semYear: new FormControl(null, { updateOn: 'change' }),
        returningStudent: new FormControl(false, { updateOn: 'change' }), // checkbox. true is returning student, otherwise new student
        progress: new FormControl(false, { updateOn: 'change' }), // radio yes/no
        refer2Transcripts: new FormControl(false, { updateOn: 'change' }),
        refer2Grades: new FormControl(false, { updateOn: 'change' }),
        refer2Other: new FormControl(null, { updateOn: 'change' }), // text
        edOrOtherGoal: new FormControl(null, { updateOn: 'change' }),
        edAssistanceThisSem: new FormControl(false, { updateOn: 'change' }), // radio Yes/No
        courseNames: new FormControl(null, { updateOn: 'change' }),
        progressEAC: new FormControl(null, { updateOn: 'change' }),
        genProgress: new FormControl(null, { updateOn: 'change' }),
      }),
    });

    if (this.mode === 'create') {
      // TODO
    } else {
      // TODO
      // for view or edit,  a children[] array holds the progress objectives
    }

    // first element is as below.
    // todo intialize each child form

    // TODO figure out what the structure of the data received from server is.
    
    if (this.mode === 'view' || this.mode === 'edit') {
      this.initVal(
        this.form,
        this.wrappedForm.formWithLatestHistory,
        this.wrappedForm.formHistoryArr);

      // supply the historical form data to super
      super.wrappedFormFromDb = this.wrappedForm;

      
    }

    // initialize the fields where the data comes from parent form
    this.initFromParentFormData();

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
      super.createForm('gotoParent'); // go to parent page, which means the whole thing will refresh
    } else if (this.mode === 'edit') {
      super.editForm(this.formKey);
    }
  }

  // BaseComponent has this, but we can extend only one class
  showRequired(mode: 'create' | 'view' | 'edit') {
    if (mode && mode === 'create' || mode === 'edit') {
      return true;
    } else {
      return false;
    }
}
}
