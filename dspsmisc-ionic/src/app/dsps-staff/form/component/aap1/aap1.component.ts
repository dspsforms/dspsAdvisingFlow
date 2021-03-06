import { Component, OnInit, OnDestroy, Input, EventEmitter, AfterViewInit, Output } from '@angular/core';
import { AbstractFormSubmit } from '../../abstract-form-submit';
import { FormName } from 'src/app/model/form.util';
import { Router } from '@angular/router';
import { FormsService } from '../../forms.service';
import { AppGlobalsService } from '../../app-globals.service';
import { LastOperationStatusService } from '../../last-operation-status.service';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { DataTransformService } from '../../data-transform.service';
import { UserService } from 'src/app/dsps-staff/user/user.service';
import { FormValidators } from '../../form-validators';

@Component({
  selector: 'app-aap1',
  templateUrl: './aap1.component.html',
  styleUrls: ['./aap1.component.scss'],
})
export class Aap1Component extends AbstractFormSubmit implements OnInit, OnDestroy, AfterViewInit {

  @Input() formKey; // for view and edit
  @Input() wrappedForm: WrappedForm; // when form has data
  @Input() mode: 'create' | 'view' | 'edit';

  @Input() focusOnSignature: boolean; // optional, if true, focus will be on signature
  
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
    super(FormName.AAP1,
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

  initFormObj() {
  
    //  header
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
        updateOn: 'change',
        validators: [Validators.required, FormValidators.collegeIdFormat]
      }),
      studentEmail: new FormControl( null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email, FormValidators.validWvmEmail]
      }),
      completedBySignature: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }), // signature, shown to user
      
      
      writtenCourseReq: new FormGroup({
        // Produce class notes, homework, course requirements, assignments 
        // and other written course requirements
        sectionHeader: new FormControl(false, { updateOn: 'change' }),

        adaptedComputer: new FormControl(false, { updateOn: 'change' }),
        assistiveTech: new FormControl(false, { updateOn: 'change' }),
        digRecorder: new FormControl(false, { updateOn: 'change' }),
        noteTaker: new FormControl(false, { updateOn: 'change' }),
        scribe: new FormControl(false, { updateOn: 'change' }),
        spellChecker: new FormControl(false, { updateOn: 'change' }),
        other: new FormControl(null, { updateOn: 'change' }),
      }),
      movingAroundCampus: new FormGroup({
        // Moving around campus or classroom
        sectionHeader: new FormControl(false, { updateOn: 'change' }),
        bypassLines: new FormControl(false, { updateOn: 'change' }),
        mobilityOrientation: new FormControl(false, { updateOn: 'change' }),
        serviceAnimal: new FormControl(false, { updateOn: 'change' }),
        other: new FormControl(null, { updateOn: 'change' }),
      }),
      visualAids: new FormGroup({
        // See or process visually presented classroom materials, texts, handouts and other printed material
        sectionHeader: new FormControl(false, { updateOn: 'change' }),
        assistiveTech: new FormControl(false, { updateOn: 'change' }),
        audio: new FormControl(false, { updateOn: 'change' }),
        brail: new FormControl(false, { updateOn: 'change' }),
        cctv: new FormControl(false, { updateOn: 'change' }),
        etext: new FormControl(false, { updateOn: 'change' }),
        enlargedPrint: new FormControl(false, { updateOn: 'change' }),
        fontSize: new FormControl(null, { updateOn: 'change' }),
        noteTaking: new FormControl(false, { updateOn: 'change' }),
        prefSeating: new FormControl(false, { updateOn: 'change' }),
        reader: new FormControl(false, { updateOn: 'change' }),
        other: new FormControl(null, { updateOn: 'change' }),
      }),
      tests: new FormGroup({
        // Take tests in the traditional manner
        sectionHeader: new FormControl(false, { updateOn: 'change' }),
        // extendedTime is a radio control. values are oneAndHalfX, twoX, or threeX
        extendedTime: new FormControl(false, { updateOn: 'change' }),
        // these are now radio values for extendedTime
        // oneAndHalfX: new FormControl(false, { updateOn: 'change' }),
        // twoX: new FormControl(false, { updateOn: 'change' }),
        // threeX: new FormControl(false, { updateOn: 'change' }),
        distractionReduced: new FormControl(false, { updateOn: 'change' }),
        breaks: new FormControl(null, { updateOn: 'change' }),
        altFormat: new FormControl(false, { updateOn: 'change' }),
        adaptedComputer: new FormControl(false, { updateOn: 'change' }),
        brail: new FormControl(false, { updateOn: 'change' }),
        calculator: new FormControl(false, { updateOn: 'change' }),
        dictionary: new FormControl(false, { updateOn: 'change' }),
        enlargedPrint: new FormControl(false, { updateOn: 'change' }),
        reader: new FormControl(false, { updateOn: 'change' }),
        scribe: new FormControl(false, { updateOn: 'change' }),
        spellChecker: new FormControl(false, { updateOn: 'change' }),
        serviceAnimal: new FormControl(false, { updateOn: 'change' }),
        other: new FormControl(null, { updateOn: 'change' }),
      }),
      hearLectures: new FormGroup({
        // Hear or process lectures, student discussions and related oral presentations
        sectionHeader: new FormControl(false, { updateOn: 'change' }),
        assistiveListening: new FormControl(false, { updateOn: 'change' }),
        closedCaptioning: new FormControl(false, { updateOn: 'change' }),
        audioDescOfVideos: new FormControl(false, { updateOn: 'change' }),
        oralInterpreter: new FormControl(false, { updateOn: 'change' }),
        prefSeating: new FormControl(false, { updateOn: 'change' }),
        realTimeCaptioning: new FormControl(false, { updateOn: 'change' }),
        signLangInterpreter: new FormControl(false, { updateOn: 'change' }),      
        serviceAnimal: new FormControl(false, { updateOn: 'change' }),
        other: new FormControl(null, { updateOn: 'change' }),
      }),
      planClasses: new FormGroup({
        // Plan appropriate class(es) complete registration process
        sectionHeader: new FormControl(false, { updateOn: 'change' }),
        priorityReg: new FormControl(false, { updateOn: 'change' }),
        regAssistance: new FormControl(false, { updateOn: 'change' }),
        schedMofification: new FormControl(false, { updateOn: 'change' }),
        other: new FormControl(null, { updateOn: 'change' }),
      }),

      personalIssues: new FormGroup({
        // Deal with disability related personal issues, interact with college instructors, 
        // counselors and other personal related to special needs
        sectionHeader: new FormControl(false, { updateOn: 'change' }),
        campusServiceRef: new FormControl(false, { updateOn: 'change' }),
        communityServiceRef: new FormControl(false, { updateOn: 'change' }),
        counseling: new FormControl(false, { updateOn: 'change' }),
        healthSafety: new FormControl(false, { updateOn: 'change' }),
        liason: new FormControl(false, { updateOn: 'change' }), 
        serviceAnimal: new FormControl(false, { updateOn: 'change' }),
        other: new FormControl(null, { updateOn: 'change' }),
      }),
      facilities: new FormGroup({
        // Using educational facilities, materials and equipment
        sectionHeader: new FormControl(false, { updateOn: 'change' }),
        adaptedFurniture: new FormControl(false, { updateOn: 'change' }),
        assistiveTech: new FormControl(false, { updateOn: 'change' }),
        // breaks: new FormControl(false, { updateOn: 'change' }),
        breaksFrequency: new FormControl(null, { updateOn: 'change' }),
        breaksDuration: new FormControl(null, { updateOn: 'change' }),
        envAdj: new FormControl(null, { updateOn: 'change' }),
        prefSeating: new FormControl(false, { updateOn: 'change' }),  
        standingOrLeavingClassroom: new FormControl(false, { updateOn: 'change' }),  
        serviceAnimal: new FormControl(false, { updateOn: 'change' }),
        other: new FormControl(null, { updateOn: 'change' }),
      }),

      career: new FormGroup({
        // Establish appropriate career goals, prepare for and find suitable employment
        sectionHeader: new FormControl(false, { updateOn: 'change' }),
        careerExploration: new FormControl(false, { updateOn: 'change' }),
        jobDev: new FormControl(false, { updateOn: 'change' }),
        vocationalCounseling: new FormControl(false, { updateOn: 'change' }),
        other: new FormControl(null, { updateOn: 'change' }),
      }),

      developSkills: new FormGroup({
        // Develop cognitive, communication and basic skills to complete course requirements
        sectionHeader: new FormControl(false, { updateOn: 'change' }),
        edAssistance: new FormControl(false, { updateOn: 'change' }),
        ldAssessment: new FormControl(false, { updateOn: 'change' }),
        tutoring: new FormControl(false, { updateOn: 'change' }),
        other: new FormControl(null, { updateOn: 'change' }),
      }),

      healthRelatedSupport: new FormGroup({
        // Adapted physical and mental health related support
        sectionHeader: new FormControl(false, { updateOn: 'change' }),
        adaptiveKinesiology: new FormControl(false, { updateOn: 'change' }),
        other: new FormControl(null, { updateOn: 'change' }),
      }),
      other: new FormGroup({
        // Other (please specify)
        sectionHeader: new FormControl(null, { updateOn: 'change' }),
        other: new FormControl(null, { updateOn: 'change' }),
      }),
     // also needed: studentSig and studentSigDate
      
      /*

      this stuff used to be page 3.
      but page 3 will have many instances for a student. 
      while this stuff will have only one instance.
      so moved here. 

        ❑ Transfer to 4-yr college w/out Associate Degree
        ❑ Transfer to 4-yr college w/Associate Degree
        ❑ Associate Degree, Vocational (non-transfer)
        ❑ Associate Degree, Vocational (non-transfer)
        ❑ Associate Degree, General Ed. (non-transfer)
        ❑ Certificate in Vocational Program
        ❑ Complete credits for High School Diploma or G.E.D.

        ❑ Discover/Formulate Career Interests, Plans, Goals 
        ❑ Improve Basic skills in English, Reading, Math
        ❑ Undecided on Educational Goal
        ❑ Acquire Job Skills Only
        ❑ Update Job Skills Only
        ❑ Maintain Certificate or License
        ❑ Personal Educational Development

      */
    //  longTermEdGoal: new FormGroup({
    //   // Long-term Educational Goal
    
    //   txferWithoutDeg: new FormControl(false, { updateOn: 'change' }),
    //   txferWithDeg: new FormControl(false, { updateOn: 'change' }),
    //   degVocationalNonTxfer: new FormControl(false, { updateOn: 'change' }),
    //   degGenNonTxfer: new FormControl(false, { updateOn: 'change' }),
    //   certVocational: new FormControl(false, { updateOn: 'change' }),
    //   completeCreditsHighSchoolGed: new FormControl(false, { updateOn: 'change' }),

    //   discover: new FormControl(false, { updateOn: 'change' }),
    //   improve: new FormControl(false, { updateOn: 'change' }),
    //   undecided: new FormControl(false, { updateOn: 'change' }),
    //   acquire: new FormControl(false, { updateOn: 'change' }),
    //   update: new FormControl(false, { updateOn: 'change' }),
    //   maintain: new FormControl(false, { updateOn: 'change' }),
    //   personalDev: new FormControl(false, { updateOn: 'change' }),
    // }),
      
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
