import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppGlobalsService } from '../../app-globals.service';



@Component({
  selector: 'app-bluesheet',
  templateUrl: './bluesheet.component.html',
  styleUrls: ['./bluesheet.component.scss'],
})
export class BluesheetComponent implements OnInit , OnDestroy {

  public form: FormGroup;

  private globalsSub: Subscription;

  public grid: boolean;

  

  constructor(
    public router: Router,
    public appGlobalsService: AppGlobalsService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.initFormObj();
  }

  initFormObj() {

    // blue sheet header
    this.form = new FormGroup({
      instructor: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      semester: new FormControl(null, {
        updateOn: 'blur',
      }),
      year: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.min(2019)]
      }),
      course: new FormControl(null, {
        updateOn: 'blur'
      }),
      section: new FormControl(null, {
        updateOn: 'blur'
      }),
      room: new FormControl(null, {
        updateOn: 'blur'
      }),
      dayTime: new FormControl(null, {
        updateOn: 'blur'
      }),
      // these two will require a workflow
      // studentAck: new FormControl(false, { updateOn: 'blur' }),
      // studentAckDate: new FormControl(null, { updateOn: 'blur' }),
      instructionalMode: new FormGroup({
        onlineCanvas: new FormControl(false, { updateOn: 'blur' }),
        synchronous: new FormControl(false, { updateOn: 'blur' }),
        asynchronous: new FormControl(false, { updateOn: 'blur' }),
        hybrid: new FormControl(false, { updateOn: 'blur' }),
      }),
      studentName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      collegeId: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      studentEmail: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.email]
      }),
      examsWithAccommodations: new FormGroup({
        // extendedTime, 1.5x, 2x etc should be hierarchical, but taking a shortcut because users are waiting
        extendedTime: new FormControl(false, { updateOn: 'blur' }),
        oneAndHalfX: new FormControl(false, { updateOn: 'blur' }),
        twoX: new FormControl(false, { updateOn: 'blur' }),
        threeX: new FormControl(false, { updateOn: 'blur' }),

        // same with breaks. should be hierarchical
        breaks: new FormControl(false, { updateOn: 'blur' }),
        twoMinPerHr: new FormControl(false, { updateOn: 'blur' }),
        fiveMinPerHr: new FormControl(false, { updateOn: 'blur' }),
        asNeeded: new FormControl(false, { updateOn: 'blur' }),

        reader: new FormControl(false, { updateOn: 'blur' }),
        scribe: new FormControl(false, { updateOn: 'blur' }),

        spellChecker: new FormControl(false, { updateOn: 'blur' }),

        basicCalc: new FormControl(false, { updateOn: 'blur' }),
        multTable: new FormControl(false, { updateOn: 'blur' }),

        adaptedComputer: new FormControl(false, { updateOn: 'blur' }),

        reducedDistractionEnv: new FormControl(false, { updateOn: 'blur' }),

        remoteProctoring: new FormControl(false, { updateOn: 'blur' }), // without recorded audio video
        enlargedPrint: new FormControl(false, { updateOn: 'blur' }),
        specifyFont: new FormControl(false, { updateOn: 'blur' }),

        magnification: new FormControl(false, { updateOn: 'blur' }),

        braille: new FormControl(false, { updateOn: 'blur' }),
        ebae: new FormControl(false, { updateOn: 'blur' }),
        ueb: new FormControl(false, { updateOn: 'blur' }),
        nemeth: new FormControl(false, { updateOn: 'blur' }),

        tactileGraphics: new FormControl(false, { updateOn: 'blur' }),
        other: new FormControl(null, { updateOn: 'blur' }),
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
        envAdjustments: new FormControl(null, { updateOn: 'blur' }),
        generalNotes: new FormControl(null, { updateOn: 'blur' })
      }),
      completedBy: new FormControl(null, { updateOn: 'blur' }),
      completedByDate: new FormControl(null, { updateOn: 'blur' }),
    });


    // initial value of grid
    this.grid = this.appGlobalsService.getGrid();

    // subscribe to changes in grid
    this.globalsSub = this.appGlobalsService.getGridValueChangeListener()
      .subscribe(data => {
        this.grid = data.grid;
      });
  }

  createOrEditForm() {
    console.log(this.form);
  }
  
  ngOnDestroy() {
    if (this.globalsSub) {
      this.globalsSub.unsubscribe();
    }
  }

}
