import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPageRoutingModule } from './view-routing.module';

import { ViewPage } from './view.page';
import { BluesheetComponentModule } from '../component/bluesheet/bluesheet-component.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    BluesheetComponentModule,
    ViewPageRoutingModule
  ],
  declarations: [ViewPage]
})
export class ViewPageModule {}
