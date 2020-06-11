import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrintViewPageRoutingModule } from './print-view-routing.module';

import { PrintViewPage } from './print-view.page';
import { BluesheetComponentModule } from '../dsps-staff/form/component/bluesheet/bluesheet-component.module';
import { Aap1ComponentModule } from '../dsps-staff/form/component/aap1/aap1.module';
import { Aap2ComponentModule } from '../dsps-staff/form/component/aap2/aap2.module';
import { GreesheetComponentModule } from '../dsps-staff/form/component/greensheet/greensheet.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BluesheetComponentModule,
    Aap1ComponentModule,
    Aap2ComponentModule,
    GreesheetComponentModule,
    PrintViewPageRoutingModule
  ],
  declarations: [PrintViewPage]
})
export class PrintViewPageModule {}
