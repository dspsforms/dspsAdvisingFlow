import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AbstractFormRead } from '../abstract-form-read';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from '../forms.service';
import { UrlConfig } from 'src/app/model/url-config';
import { Title } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { IHasChanges } from 'src/app/util/has-changes.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage extends AbstractFormRead implements OnInit, OnDestroy, IHasChanges {

  containedForm: FormGroup;
  
  // defaultBackButtonHref: string;
  constructor(
    public route: ActivatedRoute,
    public formService: FormsService,
    public titleService: Title) { 
    super(route, formService, titleService);

    
  }


  get defaultBackButtonHref() {
    if (this.formInfo && this.formInfo.formName) {
      return UrlConfig.LIST_FORMS_PRE_ABSOLUTE + this.formInfo.formName;
    } else {
      return UrlConfig.DEFAULT_BACK_BUTTON_HREF;
    }
  }

  receiveContainedForm(event) {
    console.log("contained form", event);
    this.containedForm = event;
  }

  hasChanges() {
    if (this.containedForm && this.containedForm.dirty) {
      return true;
    } else {
      return false;
    }
  }
}
