import { Component, OnInit, Input, OnDestroy, EventEmitter, ViewChild, ElementRef, AfterViewInit, Output } from '@angular/core';
import { AbstractFormSubmit } from '../../abstract-form-submit';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
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
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { AuthData } from 'src/app/auth/auth-data.model';

@Component({
  selector: 'app-aap2',
  templateUrl: './aap2.component.html',
  styleUrls: ['./aap2.component.scss'],
})
export class Aap2Component extends AbstractFormSubmit
  implements OnInit, OnDestroy, AfterViewInit {

  @Input() formKey; // for view and edit
  @Input() wrappedForm: WrappedForm; // when form has data
  @Input() mode: 'create' | 'view' | 'edit';

  // if student is viewing the form, and a signature is pending
  // provide a sign-it button and handle the sign-in
  @Input() studentUser: AuthData;

  @Input() focusOnSignature: boolean; // optional, if true, focus will be on signature

  @ViewChild('aap2ChildStart', { static: true }) aap2ChildStart: ElementRef;

  @Output() formComponent: EventEmitter<FormGroup>
      = new EventEmitter<FormGroup>();

  showNewProgressReport = false;

  currentUser: AuthData;

  routeSub: Subscription;
  paramSub: Subscription;

  constructor(
    public router: Router,
    public formsService: FormsService,
    public authService: AuthService,
    public dataTxformService: DataTransformService,
    public appGlobalsService: AppGlobalsService,
    public userService: UserService,
    public lastOpStatusService: LastOperationStatusService,
    public route : ActivatedRoute
    ) { 
    super(FormName.AAP2,
      router,
      formsService,
      authService,
      dataTxformService,
      appGlobalsService,
      userService,
      lastOpStatusService);
    
    super.setIsParent(true);

    this.onViewEnter();
    
  }

  onViewEnter() {


    this.routeSub = 
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        filter((event: NavigationEnd) => event.urlAfterRedirects.startsWith('/dsps-staff/form/view/'))
      )
      .subscribe(p => {
        // console.log('events',p);
        this.doViewInit();
      });
  }

  doViewInit() {
    this.initFormObj();
    this.currentUser = this.getUserWithDelay();
  }

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
    if (!this.currentUser) { return false; }

    if (this.currentUser.role && (
      this.currentUser.role.isFaculty ||
      this.currentUser.role.isAdmin ||
      this.currentUser.role.isStaff)) {
      return true;
    } else {
      return false;
    }
  }

  get hasChildren() {
    if (this.wrappedForm && this.wrappedForm.children &&
      this.wrappedForm.children.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.paramSub = 
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('junk')) {
        console.log(paramMap.get('junk'));

        const formName = paramMap.get('formName');
        const formId = paramMap.get('formId');
        this.router.navigate(['/dsps-staff', 'form', 'view', formName, formId]);
      }
    })
    super.ngOnInit();
    this.initFormObj();
   }

  ionViewWillEnter() {
    super.ionViewWillEnter();
    this.initFormObj();
  }

  ngAfterViewInit() {
    // if (this.semYear && this.semYear.nativeElement) {
    //   console.log("setting focus on newProgress");
    //   this.semYear.nativeElement.focus();
    // }
    console.log("in aap2-ngAfterViewInit");

    this.letParentKnow();
    
    setTimeout(() => {
        if (this.mode === 'view' &&
          this.wrappedForm &&
          this.wrappedForm.children &&
          this.wrappedForm.children.length > 0) {
              
          if (this.aap2ChildStart && this.aap2ChildStart.nativeElement) {
            console.log("setting focus on aap2ChildStart");
            this.aap2ChildStart.nativeElement.focus();
          }
        }
    }, 600);
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
        validators: [Validators.email]
      }),
      completedBySignature: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }), // signature, shown to user
      // student sig also needed

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
      
      longTermEdGoal: new FormGroup({
        // Long-term Educational Goal
      
        txferWithoutDeg: new FormControl(false, { updateOn: 'change' }),
        txferWithDeg: new FormControl(false, { updateOn: 'change' }),
        degVocationalNonTxfer: new FormControl(false, { updateOn: 'change' }),
        degGenNonTxfer: new FormControl(false, { updateOn: 'change' }),
        certVocational: new FormControl(false, { updateOn: 'change' }),
        completeCreditsHighSchoolGed: new FormControl(false, { updateOn: 'change' }),
  
        discover: new FormControl(false, { updateOn: 'change' }),
        improve: new FormControl(false, { updateOn: 'change' }),
        undecided: new FormControl(false, { updateOn: 'change' }),
        acquire: new FormControl(false, { updateOn: 'change' }),
        update: new FormControl(false, { updateOn: 'change' }),
        maintain: new FormControl(false, { updateOn: 'change' }),
        personalDev: new FormControl(false, { updateOn: 'change' }),
      }),

      // progressObj: new FormGroup({
      //   // Progress Objectives
      //   semYear: new FormControl(null, { updateOn: 'change' }),
      //   studentType: new FormControl(false, { updateOn: 'change' }), // radio new student/returning student
      //   edOrOtherGoal: new FormControl(null, { updateOn: 'change' }),
      //   edAssistanceThisSem: new FormControl(false, { updateOn: 'change' }), // radio Yes/No
      //   courseNames: new FormControl(null, { updateOn: 'change' }),
      //   progressEAC: new FormControl(null, { updateOn: 'change' }),
      //   genProgress: new FormControl(null, { updateOn: 'change' }),
      // }),

    });

    if (this.mode === 'create') {
      // TODO
    } else {
      // TODO
      // for view or edit,  a children[] array holds the progress objectives
    }

    // first element is as below.
    // todo intialize each child form

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
      // this.showNewProgressReport = true;
    }
  } 

  letParentKnow() {
    // give the container page that we are in know a link to us so they
    // can check if our form is dirty
    
    
    if (this.mode === 'create' || this.mode === 'edit') {
      console.log("in letParentKnow. calling emit. mode=", this.mode);
      this.formComponent.emit(this.form);
    }
  }

  // if an Aap2Child fires its output event
  receiveContainedForm(event) {
    console.log("Aap2: child sent this contained form", event);
    // let parent (container view page ) know 
    this.formComponent.emit(event);
  }

  createOrEditForm() {
    console.log("createOrEditForm ", this.formName, "  ", this.form.value);

    if (!this.form.valid) {
      // may be saved as a draft later.
      return;
    }

    if (this.mode === 'create') {
      super.isParent = true;
      super.childFormName = FormName.AAP2_CHILD;
      super.createForm('stayOnPage'); // stay on page -- will return in view mode
    } else if (this.mode === 'edit') {
      super.editForm(this.formKey);
    }
  }

  toggleNewProgressReport() {
    this.showNewProgressReport = !this.showNewProgressReport;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    SubscriptionUtil.unsubscribe(this.routeSub);
  }

  onSigned(event) {
    console.log("onSigned:", event);
  }

  showRequired(mode: 'create' | 'view' | 'edit') {
    if (mode && mode === 'create' || mode === 'edit') {
      return true;
    } else {
      return false;
    }
  }
}
