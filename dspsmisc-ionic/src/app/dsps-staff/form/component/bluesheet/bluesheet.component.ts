import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
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
import { FormValidators } from '../../form-validators';
import { AuthData } from 'src/app/auth/auth-data.model';



@Component({
  selector: 'app-bluesheet',
  templateUrl: './bluesheet.component.html',
  styleUrls: ['./bluesheet.component.scss'],
})
export class BluesheetComponent extends AbstractFormSubmit implements OnInit, OnDestroy
  ,  AfterViewInit {

  @Input() formKey; // for view and edit
 
  @Input() mode: 'create' | 'view' | 'edit';

  @Input() focusOnSignature: boolean; // optional, if true, focus will be on signature
  
  @Output() formComponent: EventEmitter<FormGroup>
    = new EventEmitter<FormGroup>();
  
  currentUser: AuthData;
  
  //  @Input() wrappedForm: WrappedForm; // when form has data

  _wrappedForm: WrappedForm;

  // see https://stackoverflow.com/a/44686085
  @Input() set wrappedForm(w: WrappedForm) {
    this._wrappedForm = w;
    if (this.form) {
      this.initFormVal(this._wrappedForm);
    }
    
  }

  get wrappedForm() {
    return this._wrappedForm;

  }

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
    this.currentUser = this.getUserWithDelay();
   }

  ionViewWillEnter() {
    super.ionViewWillEnter();
    this.initFormObj();
    this.currentUser = this.getUserWithDelay();
    
    this.letParentKnow();
  }

  initFormObj() {

    
    // blue sheet header
    this.form = new FormGroup({
      instructor: new FormControl( null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      semester: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      year: new FormControl( null , {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(2020)]
      }),
      course: new FormControl( null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      section: new FormControl(null, {
        updateOn: 'change'
      }),
      room: new FormControl( null, { updateOn: 'change' }),
      dayTime: new FormControl( null, {  updateOn: 'change' }),
      // these two will require a workflow
      // studentAck: new FormControl(false, { updateOn: 'change' }),
      // studentAckDate: new FormControl(null, { updateOn: 'change' }),
      instructionalMode: new FormGroup({
        onlineCanvas: new FormControl( false, { updateOn: 'change' }),
        synchronous: new FormControl(false, { updateOn: 'change' }),
        asynchronous: new FormControl( false, { updateOn: 'change' }),
        hybrid: new FormControl( false, {  updateOn: 'change' }),
      }),
      studentLastName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      studentFirstName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      collegeId: new FormControl( null, {
        updateOn: 'change',
        validators: [Validators.required, FormValidators.collegeIdFormat]
      }),
      studentEmail: new FormControl( null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.email, FormValidators.validWvmEmail]
      }),
      examsWithAccommodations: new FormGroup({
        // extendedTime, 1.5x, 2x etc should be hierarchical, but taking a shortcut because users are waiting
        extendedTime: new FormControl( false,  { updateOn: 'change' }),
        oneAndHalfX: new FormControl( false,  { updateOn: 'change' }),
        twoX: new FormControl(false, { updateOn: 'change' }),
        threeX: new FormControl( false, { updateOn: 'change' }),

        // same with breaks. should be hierarchical
        breaks: new FormControl( false,  { updateOn: 'change' }),
        twoMinPerHr: new FormControl(false, { updateOn: 'change' }),
        fiveMinPerHr: new FormControl( false, { updateOn: 'change' }),
        asNeeded: new FormControl(false, { updateOn: 'change' }),

        reader: new FormControl( false, { updateOn: 'change' }),
        scribe: new FormControl(false, { updateOn: 'change' }),

        spellChecker: new FormControl( false, { updateOn: 'change' }),

        basicCalc: new FormControl(false, { updateOn: 'change' }),
        multTable: new FormControl( false, { updateOn: 'change' }),

        adaptedComputer: new FormControl( false, { updateOn: 'change' }),

        reducedDistractionEnv: new FormControl( false, { updateOn: 'change' }),

        remoteProctoring: new FormControl( false, { updateOn: 'change' }), // without recorded audio video
        enlargedPrint: new FormControl( false,  { updateOn: 'change' }),
        specifyFont: new FormControl( null, { updateOn: 'change' }),

        magnification: new FormControl( false, { updateOn: 'change' }),

        braille: new FormControl( false, { updateOn: 'change' }),
        // ebae: new FormControl( false, { updateOn: 'change' }),
        // ueb: new FormControl( false,  { updateOn: 'change' }),
        // nemeth: new FormControl(false,  { updateOn: 'change' }),

        tactileGraphics: new FormControl( false,  { updateOn: 'change' }),
        other: new FormControl( null,{ updateOn: 'change' }),
      }),
      auxiliaryAids: new FormGroup({
        dspsTutoring: new FormControl(false, { updateOn: 'change' }),
        serviceAnimal: new FormControl(false, { updateOn: 'change' }),
        signLangInterpreting: new FormControl(false, { updateOn: 'change' }),
        realTimeCaptioning: new FormControl(false, { updateOn: 'change' }),
        sharedNotes: new FormControl(false, { updateOn: 'change' }),
        audioRecordLectures: new FormControl(false, { updateOn: 'change' }),
        other: new FormControl(null, { updateOn: 'change' }),
      }),
      adaptiveTech: new FormGroup({
        computer: new FormControl(false, { updateOn: 'change' }),
        calculator: new FormControl(false, { updateOn: 'change' }),
        cctvMagnifier: new FormControl(false, { updateOn: 'change' }),
        assistiveListeningDevice: new FormControl(false, { updateOn: 'change' }),
        digitalRecorder: new FormControl(false, { updateOn: 'change' }),
        liveScribeSmartPen: new FormControl(false, { updateOn: 'change' }),
        ipadAndroidTablet: new FormControl(false, { updateOn: 'change' }),
        other: new FormControl(null, { updateOn: 'change' }),
      }),
      physicalAccess: new FormGroup({
        accessibleDesk: new FormControl(false, { updateOn: 'change' }),
        accessibleChair: new FormControl(false, { updateOn: 'change' }),
        preferentialSeating: new FormControl(false, { updateOn: 'change' }),
        bypassLines: new FormControl(false, { updateOn: 'change' }),
        breaks: new FormControl(false, { updateOn: 'change' }),
        twoMinPerHr: new FormControl(false, { updateOn: 'change' }),
        fiveMinPerHr: new FormControl(false, { updateOn: 'change' }),
        asNeeded: new FormControl(false, { updateOn: 'change' }),
        changeClassLoc: new FormControl(false, { updateOn: 'change' }),
        other: new FormControl(null, { updateOn: 'change' }),
        envAdjustments: new FormControl( null, { updateOn: 'change' }),
      }),
      altMedia: new FormGroup({
        braille: new FormControl(false, { updateOn: 'change' }),
        // ebae: new FormControl(false, { updateOn: 'change' }),
        // ueb: new FormControl(false, { updateOn: 'change' }),
        // nemeth: new FormControl(false, { updateOn: 'change' }),
        tactileGraphics: new FormControl(false, { updateOn: 'change' }),
        enlargedPrint: new FormControl(false, { updateOn: 'change' }),
        specifyFont: new FormControl(null, { updateOn: 'change' }),
        etext: new FormControl(false, { updateOn: 'change' }),
        kurzweil: new FormControl(false, { updateOn: 'change' }),
        pdf: new FormControl(false, { updateOn: 'change' }),
        audioRecorded: new FormControl(false, { updateOn: 'change' }),
        learningAlly: new FormControl(false, { updateOn: 'change' }),
        bookShare: new FormControl(false, { updateOn: 'change' }),
        closedCaption: new FormControl(false, { updateOn: 'change' }),
        audioDesc: new FormControl(false, { updateOn: 'change' }),
        other: new FormControl(null, { updateOn: 'change' })
      }),
      general: new FormGroup({
        generalNotes: new FormControl(null, { updateOn: 'change' })
      }),
      completedBySignature: new FormControl( null, { updateOn: 'change' , validators: [Validators.required] }),
      completedByDate: new FormControl( null,  { updateOn: 'change' }),
    });

    this.initFormVal(this.wrappedForm);

  }

  initFormVal(w: WrappedForm) {

    if (this.mode === 'view' || this.mode === 'edit') {
      this.initVal(
        this.form,
        w.formWithLatestHistory,
        w.formHistoryArr);

      console.log("after form init", this.form);

      // supply the historical form data to super
      super.wrappedFormFromDb = w;

    }
    
    if (this.mode === 'create' &&
      w && w.formWithLatestHistory
      && w.formHistoryArr) {
      // for a new bluesheet for example, if it were being initialized with values from a different form
      // we use wrappedForm only for initial values, but don't update it the way we would for edit
      this.initVal(
        this.form,
        w.formWithLatestHistory,
        w.formHistoryArr, // this is not used, but it will be accessed by initVal
        true ); // forCreate
       
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

  // this is probably not needed. user shouldn't be coming here if 
  // they are not logged in. if they are logged in, getUser() should have
  // a value 
  // try several times
  getUserWithDelay(): AuthData {
    let count = 0;
    let user = this.getUser();
    
    let currentTimeout = 200; // msec
    const maxTimeout = 5000; // msec
    while (!user && count++ < 1000) {
      setTimeout(() => user = this.getUser(), currentTimeout);
      // exponential backoff, truncated to maxTimeout
      currentTimeout = Math.min(currentTimeout * 2, maxTimeout);
    }
    
    return user;
  }
  
  getUser() {
    return this.authService.getUser();
  }

  get isDspsAuth() {
   
    if (this.currentUser && this.currentUser.role && (
      this.currentUser.role.isFaculty ||
      this.currentUser.role.isAdmin ||
      this.currentUser.role.isStaff)) {
      return true;
    } else {
      return false;
    }
  }


}
