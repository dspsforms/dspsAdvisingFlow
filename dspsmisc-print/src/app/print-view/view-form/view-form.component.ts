import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractFormRead } from 'src/app/dsps-staff/form/abstract-form-read';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from 'src/app/dsps-staff/form/forms.service';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.scss']
})
export class ViewFormComponent extends AbstractFormRead implements OnInit, OnDestroy {

  constructor(
    public route: ActivatedRoute,
    public formService: FormsService,
    public router: Router) {
    super(route, formService);
  }


}
