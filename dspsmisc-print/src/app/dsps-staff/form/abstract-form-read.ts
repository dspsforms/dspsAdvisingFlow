import { OnInit, OnDestroy } from '@angular/core';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from './forms.service';
import { SubscriptionUtil } from 'src/app/util/subscription-util';
import { FormUtil } from '../../model/form.util';
import { Subscription } from 'rxjs';
import { Config } from 'src/app/model/config';




export class AbstractFormRead implements OnInit, OnDestroy {

    // base class to read form data for view and edit

    paramSubscription : Subscription;
    dbSubscription : Subscription;

    busy = false;
    showJson = false;

    config: Config;

    formInfo = { formName: '', formTitle: '', _id: ''};

    data: WrappedForm;

    private isStudentUser = false; // set this to true for students viewing their own form

    constructor(
        public route: ActivatedRoute,
        public formService: FormsService) { }

    setStudentUser(b: boolean) {
        this.isStudentUser = b;
    }

    ngOnInit() {

        this.data = new WrappedForm({});

        this.paramSubscription = this.route.params.subscribe(
            params => {
              console.log("params", params);

              this.formInfo.formName = params['formName'];
              this.formInfo.formTitle = FormUtil.formTitle(this.formInfo.formName);
              this.formInfo._id = params['formId'];

              this.data.formKey = params['formId'];
              console.log("formInfo", this.formInfo);

            });

        this.busy = true;

        this.dbSubscription  = this.formService.getCurrentFormUpdatedListener().subscribe(formData => {
              this.data = formData;
              this.busy = false;
        });


        this.data = new WrappedForm({});
        this.busy = true;
        this.formService.getFormData2(
            this.formInfo.formName,
            this.formInfo._id,
            this.isStudentUser
        );


    }

    ngOnDestroy() {

        SubscriptionUtil.unsubscribe(this.paramSubscription);
        SubscriptionUtil.unsubscribe(this.dbSubscription);



    }

    get studentName() {

        if (this.data &&
            this.data.formWithLatestHistory &&
            this.data.formWithLatestHistory['studentName']
        ) {
            return this.data.formWithLatestHistory['studentName'].val;
        } else {
            return null;
        }

    }



}
