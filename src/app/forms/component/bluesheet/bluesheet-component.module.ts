import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { BluesheetComponent } from './bluesheet.component';
import { InnerComponent } from './inner/inner.component';
import { BluesheetHeaderComponent } from './bluesheet-header/bluesheet-header.component';
import { ExamsWithAccomodationsComponent } from './exams-with-accomodations/exams-with-accomodations.component';
import { AuxiliaryAidsComponent } from './auxiliary-aids/auxiliary-aids.component';
import { AdaptiveTechComponent } from './adaptive-tech/adaptive-tech.component';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    BluesheetComponent,
    BluesheetHeaderComponent,
    ExamsWithAccomodationsComponent,
    AuxiliaryAidsComponent,
    AdaptiveTechComponent,
    InnerComponent
  ],
  declarations: [
    BluesheetComponent,
    BluesheetHeaderComponent,
    ExamsWithAccomodationsComponent,
    AuxiliaryAidsComponent,
    AdaptiveTechComponent,
    InnerComponent
  ]
})
export class BluesheetComponentModule {}