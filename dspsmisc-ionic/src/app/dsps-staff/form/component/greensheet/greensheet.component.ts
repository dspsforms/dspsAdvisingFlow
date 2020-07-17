import { Component, OnInit, Input, OnDestroy, EventEmitter, AfterViewInit, Output } from '@angular/core';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { AbstractFormSubmit } from '../../abstract-form-submit';
import { Router } from '@angular/router';
import { FormsService } from '../../forms.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DataTransformService } from '../../data-transform.service';
import { AppGlobalsService } from '../../app-globals.service';
import { LastOperationStatusService } from '../../last-operation-status.service';
import { UserService } from 'src/app/dsps-staff/user/user.service';
import { FormName } from 'src/app/model/form.util';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from '../../form-validators';

@Component({
  selector: 'app-greensheet',
  templateUrl: './greensheet.component.html',
  styleUrls: ['./greensheet.component.scss'],
})
export class GreensheetComponent extends AbstractFormSubmit implements OnInit, OnDestroy, AfterViewInit  {

  @Input() formKey; // for view and edit
  @Input() wrappedForm: WrappedForm; // when form has data
  @Input() mode: 'create' | 'view' | 'edit';

  @Output() formComponent: EventEmitter<FormGroup>
  = new EventEmitter<FormGroup>();

  constructor(
    public router: Router,
    public formsService: FormsService,
    public authService: AuthService,
    public dataTxformService: DataTransformService,
    public appGlobalsService: AppGlobalsService,
    public userService: UserService,
    public lastOpStatusService: LastOperationStatusService,
    ) { 
    super(FormName.GREENSHEET,
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
    this.letParentKnow();
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
      semester: new FormControl(null, { updateOn: 'change' }),
      studentLastName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      studentFirstName: new FormControl(null, {
        updateOn: 'change',
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
        updateOn: 'change',
        validators: [Validators.required]
      }), // signature, shown to user
      // student sig also needed

      address: new FormGroup({
        addrLine: new FormControl(null, { updateOn: 'change' }),
        city: new FormControl(null, { updateOn: 'change' }),
        zip: new FormControl(null, { updateOn: 'change' }),
        homePhone: new FormControl(null, { updateOn: 'change' }),
        cellPhone: new FormControl(null, { updateOn: 'change' }),
      }),
      major: new FormControl(null, { updateOn: 'change' }),
      part2: new FormGroup({
        deptRehabClient: new FormControl(false, { updateOn: 'change' }), // yes/no radio
        deptRahabEndDate: new FormControl(null, { updateOn: 'change' }),
        fosterYouth: new FormControl(false, { updateOn: 'change' }), // yes/no radio
        veteran: new FormControl(false, { updateOn: 'change' }), // yes/no radio
        homeless: new FormControl(false, { updateOn: 'change' }), // yes/no radio
        instructionalSetting: new FormControl(false, { updateOn: 'change' }), // yes/no radio
        onCampusReg: new FormControl(false, { updateOn: 'change' }), 
        onCampusSpecial: new FormControl(false, { updateOn: 'change' }), 

        // serviceContracts: new FormControl(false, { updateOn: 'change' }),  // primary/secondary 
      }),

      serviceContracts: new FormGroup({
        primary: new FormControl(false, { updateOn: 'change' }), // checkbox
        secondary: new FormControl(false, { updateOn: 'change' }), // checkbox

      }),
      
      /*

      Primary
 Acquired Brain Injury
 Attention Deficit Hyperactivity Disorder  Autism Spectrum Disorder
 Blind and Low Vision
 Deaf and Hard of Hearing
 Intellectual Disability
 Learning Disabled
 Mental Health Disability
 Physical Disability
Other

Secondary
 Acquired Brain Injury
 Attention Deficit Hyperactivity Disorder
 Autism Spectrum Disorder
 Blind and Low Vision
 Deaf and Hard of Hearing
 Intellectual Disability
 Learning Disabled
 Mental Health Disability
 Physical Disability
Other


      */
      disabilityServicesPrimary: new FormGroup({
        //Primary
      
        acquiredBrainInjury: new FormControl(false, { updateOn: 'change' }),
        adhd: new FormControl(false, { updateOn: 'change' }),
        autismSpectrum: new FormControl(false, { updateOn: 'change' }),
        blindLowVision: new FormControl(false, { updateOn: 'change' }),
        deafHardOfHearing: new FormControl(false, { updateOn: 'change' }),
        intellectualDisability: new FormControl(false, { updateOn: 'change' }),

        learningDisabled: new FormControl(false, { updateOn: 'change' }),
        mentalHealthDisabilty: new FormControl(false, { updateOn: 'change' }),
        physicalDisability: new FormControl(false, { updateOn: 'change' }),
        other: new FormControl(false, { updateOn: 'change' }),
     
      }),

      disabilityServicesSecondary: new FormGroup({
        // Secondary
        acquiredBrainInjury: new FormControl(false, { updateOn: 'change' }),
        adhd: new FormControl(false, { updateOn: 'change' }),
        autismSpectrum: new FormControl(false, { updateOn: 'change' }),
        blindLowVision: new FormControl(false, { updateOn: 'change' }),
        deafHardOfHearing: new FormControl(false, { updateOn: 'change' }),
        intellectualDisability: new FormControl(false, { updateOn: 'change' }),

        learningDisabled: new FormControl(false, { updateOn: 'change' }),
        mentalHealthDisabilty: new FormControl(false, { updateOn: 'change' }),
        physicalDisability: new FormControl(false, { updateOn: 'change' }),
        other: new FormControl(false, { updateOn: 'change' }),
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

  ngAfterViewInit() {
    this.letParentKnow();
  }

  letParentKnow() {
    // give the container page that we are in know a link to us so they
    // can check if our form is dirty
    
    
    if (this.mode === 'create' || this.mode === 'edit') {
      console.log("in letParentKnow. calling emit. mode=", this.mode);
      this.formComponent.emit(this.form);
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
