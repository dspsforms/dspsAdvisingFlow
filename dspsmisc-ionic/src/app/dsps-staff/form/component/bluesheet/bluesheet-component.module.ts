import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { BluesheetComponent } from './bluesheet.component';
import { BluesheetHeaderComponent } from './bluesheet-header/bluesheet-header.component';
import { ExamsWithAccomodationsComponent } from './exams-with-accomodations/exams-with-accomodations.component';
import { AuxiliaryAidsComponent } from './auxiliary-aids/auxiliary-aids.component';
import { AdaptiveTechComponent } from './adaptive-tech/adaptive-tech.component';
import { PhysicalAccessComponent } from './physical-access/physical-access.component';
import { AltFormatComponent } from './alt-format/alt-format.component';
import { GeneralComponent } from './general/general.component';
import { BluesheetFooterComponent } from './bluesheet-footer/bluesheet-footer.component';
import { RequiredFieldPromptComponentModule } from '../required-field-prompt/required-field-prompt.module';
import { SigViewModule } from '../sig-view/sig-view.module';
import { SigCreateModule } from '../sig-create/sig-create.module';
import { FindMyEmailComponentModule } from '../find-my-email/find-my-email.module';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
    SigViewModule,
    SigCreateModule,
    FindMyEmailComponentModule,
    RequiredFieldPromptComponentModule
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