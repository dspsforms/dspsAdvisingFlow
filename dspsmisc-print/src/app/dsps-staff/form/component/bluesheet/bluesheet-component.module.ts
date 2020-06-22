import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BluesheetComponent } from './bluesheet.component';
import { ExamsWithAccomodationsComponent } from './exams-with-accomodations/exams-with-accomodations.component';
import { AuxiliaryAidsComponent } from './auxiliary-aids/auxiliary-aids.component';
import { AdaptiveTechComponent } from './adaptive-tech/adaptive-tech.component';
import { PhysicalAccessComponent } from './physical-access/physical-access.component';
import { AltFormatComponent } from './alt-format/alt-format.component';
import { GeneralComponent } from './general/general.component';
import { BluesheetFooterComponent } from './bluesheet-footer/bluesheet-footer.component';
import { SigViewModule } from '../sig-view/sig-view.module';
import { BluesheetHeaderComponent } from './bluesheet-header/bluesheet-header.component';
import { LabelValuePrintModule } from '../label-value-print/label-value-print.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SigViewModule,
    LabelValuePrintModule
  ],
  exports: [
    BluesheetComponent,
    BluesheetHeaderComponent,
    ExamsWithAccomodationsComponent,
    AuxiliaryAidsComponent,
    AdaptiveTechComponent,
    PhysicalAccessComponent,
    AltFormatComponent,
    GeneralComponent,
    BluesheetFooterComponent
  ],
  declarations: [
    BluesheetComponent,
    BluesheetHeaderComponent,
    ExamsWithAccomodationsComponent,
    AuxiliaryAidsComponent,
    AdaptiveTechComponent,
    PhysicalAccessComponent,
    AltFormatComponent,
    GeneralComponent,
    BluesheetFooterComponent
  ]
})
export class BluesheetComponentModule {}
