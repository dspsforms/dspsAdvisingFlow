import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';


import { PrintViewRoutingModule } from './print-view-routing.module';

import { PrintViewComponent } from './print-view.component';
import { GenericComponent } from './generic/generic.component';
// import { ViewFormComponent } from './view-form/view-form.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrintViewRoutingModule
  ],

  declarations: [
    PrintViewComponent,
    GenericComponent,
    // ViewFormComponent
  ]
})
export class PrintViewModule {}
