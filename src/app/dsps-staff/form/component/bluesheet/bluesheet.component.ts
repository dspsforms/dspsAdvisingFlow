import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppGlobalsService } from '../../app-globals.service';
import { AbstractFormSubmit } from '../../abstract-form-submit';
import { FormName } from 'src/app/model/form.util';
import { FormsService } from '../../forms.service';
import { LastOperationStatusService } from '../../last-operation-status.service';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { AuthService } from 'src/app/auth/auth.service';
import { DataTransformService } from '../../data-transform.service';
import { UserService } from 'src/app/dsps-staff/user/user.service';



@Component({
  selector: 'app-bluesheet',
  templateUrl: './bluesheet.component.html',
  styleUrls: ['./bluesheet.component.scss'],
})
export class BluesheetComponent extends AbstractFormSubmit implements OnInit, OnDestroy {

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
    ) { 
    super(FormName.BLUESHEET,
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

  initFormObj() {

    
    // blue sheet header
    this.form = new FormGroup({
      instructor: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      semester: new FormControl(null , { updateOn: 'blur'}),
      year: new FormControl( null , {
        updateOn: 'blur',
        validators: [Validators.min(2019)]
      }),
      course: new FormControl( null, {
        updateOn: 'blur'
      }),
      section: new FormControl( null, { updateOn: 'blur' }),
      room: new FormControl( null, { updateOn: 'blur' }),
      dayTime: new FormControl( null, {  updateOn: 'blur' }),
      // these two will require a workflow
      // studentAck: new FormControl(false, { updateOn: 'blur' }),
      // studentAckDate: new FormControl(null, { updateOn: 'blur' }),
      instructionalMode: new FormGroup({
        onlineCanvas: new FormControl( false, { updateOn: 'blur' }),
        synchronous: new FormControl(false, { updateOn: 'blur' }),
        asynchronous: new FormControl( false, { updateOn: 'blur' }),
        hybrid: new FormControl( false, {  updateOn: 'blur' }),
      }),
      studentName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      collegeId: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      studentEmail: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.email]
      }),
      examsWithAccommodations: new FormGroup({
        // extendedTime, 1.5x, 2x etc should be hierarchical, but taking a shortcut because users are waiting
        extendedTime: new FormControl( false,  { updateOn: 'blur' }),
        oneAndHalfX: new FormControl( false,  { updateOn: 'blur' }),
        twoX: new FormControl(false, { updateOn: 'blur' }),
        threeX: new FormControl( false, { updateOn: 'blur' }),

        // same with breaks. should be hierarchical
        breaks: new FormControl( false,  { updateOn: 'blur' }),
        twoMinPerHr: new FormControl(false, { updateOn: 'blur' }),
        fiveMinPerHr: new FormControl( false, { updateOn: 'blur' }),
        asNeeded: new FormControl(false, { updateOn: 'blur' }),

        reader: new FormControl( false, { updateOn: 'blur' }),
        scribe: new FormControl(false, { updateOn: 'blur' }),

        spellChecker: new FormControl( false, { updateOn: 'blur' }),

        basicCalc: new FormControl(false, { updateOn: 'blur' }),
        multTable: new FormControl( false, { updateOn: 'blur' }),

        adaptedComputer: new FormControl( false, { updateOn: 'blur' }),

        reducedDistractionEnv: new FormControl( false, { updateOn: 'blur' }),

        remoteProctoring: new FormControl( false, { updateOn: 'blur' }), // without recorded audio video
        enlargedPrint: new FormControl( false,  { updateOn: 'blur' }),
        specifyFont: new FormControl( null, { updateOn: 'blur' }),

        magnification: new FormControl( false, { updateOn: 'blur' }),

        braille: new FormControl( false, { updateOn: 'blur' }),
        ebae: new FormControl( false, { updateOn: 'blur' }),
        ueb: new FormControl( false,  { updateOn: 'blur' }),
        nemeth: new FormControl(false,  { updateOn: 'blur' }),

        tactileGraphics: new FormControl( false,  { updateOn: 'blur' }),
        other: new FormControl( null,{ updateOn: 'blur' }),
      }),
      auxiliaryAids: new FormGroup({
        dspsTutoring: new FormControl(false, { updateOn: 'blur' }),
        serviceAnimal: new FormControl(false, { updateOn: 'blur' }),
        signLangInterpreting: new FormControl(false, { updateOn: 'blur' }),
        realTimeCaptioning: new FormControl(false, { updateOn: 'blur' }),
        sharedNotes: new FormControl(false, { updateOn: 'blur' }),
        audioRecordLectures: new FormControl(false, { updateOn: 'blur' }),
        other: new FormControl(null, { updateOn: 'blur' }),
      }),
      adaptiveTech: new FormGroup({
        computer: new FormControl(false, { updateOn: 'blur' }),
        calculator: new FormControl(false, { updateOn: 'blur' }),
        cctvMagnifier: new FormControl(false, { updateOn: 'blur' }),
        assistiveListeningDevice: new FormControl(false, { updateOn: 'blur' }),
        digitalRecorder: new FormControl(false, { updateOn: 'blur' }),
        liveScribeSmartPen: new FormControl(false, { updateOn: 'blur' }),
        ipadAndroidTablet: new FormControl(false, { updateOn: 'blur' }),
        other: new FormControl(null, { updateOn: 'blur' }),
      }),
      physicalAccess: new FormGroup({
        accessibleDesk: new FormControl(false, { updateOn: 'blur' }),
        accessibleChair: new FormControl(false, { updateOn: 'blur' }),
        preferentialSeating: new FormControl(false, { updateOn: 'blur' }),
        bypassLines: new FormControl(false, { updateOn: 'blur' }),
        breaks: new FormControl(false, { updateOn: 'blur' }),
        twoMinPerHr: new FormControl(false, { updateOn: 'blur' }),
        fiveMinPerHr: new FormControl(false, { updateOn: 'blur' }),
        asNeeded: new FormControl(false, { updateOn: 'blur' }),
        changeClassLoc: new FormControl(false, { updateOn: 'blur' }),
        other: new FormControl(null, { updateOn: 'blur' })
      }),
      altMedia: new FormGroup({
        braille: new FormControl(false, { updateOn: 'blur' }),
        ebae: new FormControl(false, { updateOn: 'blur' }),
        ueb: new FormControl(false, { updateOn: 'blur' }),
        nemeth: new FormControl(false, { updateOn: 'blur' }),
        tactileGraphics: new FormControl(false, { updateOn: 'blur' }),
        enlargedPrint: new FormControl(false, { updateOn: 'blur' }),
        specifyFont: new FormControl(false, { updateOn: 'blur' }),
        etext: new FormControl(false, { updateOn: 'blur' }),
        kurzweil: new FormControl(false, { updateOn: 'blur' }),
        pdf: new FormControl(false, { updateOn: 'blur' }),
        audioRecorded: new FormControl(false, { updateOn: 'blur' }),
        learningAlly: new FormControl(false, { updateOn: 'blur' }),
        bookShare: new FormControl(false, { updateOn: 'blur' }),
        closedCaption: new FormControl(false, { updateOn: 'blur' }),
        audioDesc: new FormControl(false, { updateOn: 'blur' }),
        other: new FormControl(null, { updateOn: 'blur' })
      }),
      general: new FormGroup({
        envAdjustments: new FormControl( null, { updateOn: 'blur' }),
        generalNotes: new FormControl(null, { updateOn: 'blur' })
      }),
      completedBy: new FormControl( null, { updateOn: 'blur' }),
      completedByDate: new FormControl( null,  { updateOn: 'blur' }),
    });


    if (this.mode === 'view' || this.mode === 'edit') {
      this.initVal(
        this.form,
        this.wrappedForm.formWithLatestHistory,
        this.wrappedForm.formHistoryArr);

      console.log("after form init", this.form);

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
