import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPageRoutingModule } from './view-routing.module';

import { ViewPage } from './view.page';
import { BluesheetComponentModule } from '../component/bluesheet/bluesheet-component.module';
import { Aap1ComponentModule } from '../component/aap1/aap1.module';
import { Aap2ComponentModule } from '../component/aap2/aap2.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    BluesheetComponentModule,
    Aap1ComponentModule,
    Aap2ComponentModule,
    ViewPageRoutingModule
  ],
  declarations: [ViewPage]
})
export class ViewPageModule {}
