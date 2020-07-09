import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AbstractFormSubmit } from '../../abstract-form-submit';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FormsService } from '../../forms.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FormName } from 'src/app/model/form.util';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { UserService } from 'src/app/dsps-staff/user/user.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { FormValidators } from '../../form-validators';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { AuthData } from 'src/app/auth/auth-data.model';
import { DataTransformService } from '../../data-transform/data-transform.service';
import { AppGlobalsService } from '../../app-globals/app-globals.service';
import { LastOperationStatusService } from '../../last-operation-status/last-operation-status.service';
import { Title } from '@angular/platform-browser';

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

  showNewProgressReport = false;

  paramSub: Subscription;

  constructor(
    public router: Router,
    public formsService: FormsService,
    public authService: AuthService,
    public dataTxformService: DataTransformService,
    public appGlobalsService: AppGlobalsService,
    public userService: UserService,
    public lastOpStatusService: LastOperationStatusService,
    public route: ActivatedRoute,
    public titleService: Title
    ) {
    super(FormName.AAP2,
      router,
      formsService,
      authService,
      dataTxformService,
      appGlobalsService,
      userService,
      lastOpStatusService,
      titleService);

    super.setIsParent(true);


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


  ngAfterViewInit() {
    // if (this.semYear && this.semYear.nativeElement) {
    //   console.log("setting focus on newProgress");
    //   this.semYear.nativeElement.focus();
    // }
    console.log("in aap2-ngAfterViewInit");

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

    super.setWrappedFormFromDb(this.wrappedForm);

  }



  toggleNewProgressReport() {
    this.showNewProgressReport = !this.showNewProgressReport;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSigned(event) {
    console.log("onSigned:", event);
  }

}
