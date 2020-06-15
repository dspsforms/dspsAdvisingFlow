import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentViewFormPageRoutingModule } from './student-view-form-routing.module';

import { StudentViewFormPage } from './student-view-form.page';
import { BluesheetComponentModule } from 'src/app/dsps-staff/form/component/bluesheet/bluesheet-component.module';
import { Aap1ComponentModule } from 'src/app/dsps-staff/form/component/aap1/aap1.module';
import { Aap2ComponentModule } from 'src/app/dsps-staff/form/component/aap2/aap2.module';
import { SigViewModule } from 'src/app/dsps-staff/form/component/sig-view/sig-view.module';
import { SigCreateModule } from 'src/app/dsps-staff/form/component/sig-create/sig-create.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BluesheetComponentModule,
    Aap1ComponentModule,
    Aap2ComponentModule,
    SigViewModule,
    SigCreateModule,
    StudentViewFormPageRoutingModule
  ],
  declarations: [StudentViewFormPage]
})
export class StudentViewFormPageModule {}
