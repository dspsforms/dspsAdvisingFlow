import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DspsStaffPageRoutingModule } from './dsps-staff-routing.module';

import { DspsStaffPage } from './dsps-staff.page';
import { ConfirmDeactivate } from '../util/confirm-deactivate';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DspsStaffPageRoutingModule
  ],
  declarations: [DspsStaffPage]
})
export class DspsStaffPageModule {}
