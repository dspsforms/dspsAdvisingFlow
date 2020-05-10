import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractFormRead } from '../abstract-form-read';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from '../forms.service';
import { UrlConfig } from 'src/app/model/url-config';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage extends AbstractFormRead implements OnInit, OnDestroy {

  defaultBackButtonHref: string;
  constructor(
    public route: ActivatedRoute,
    public formService: FormsService) { 
    super(route, formService);

    this.defaultBackButtonHref = UrlConfig.DEFAULT_BACK_BUTTON_HREF;
  }

}
