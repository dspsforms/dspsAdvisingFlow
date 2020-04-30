import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateBluesheetPageRoutingModule } from './create-bluesheet-routing.module';

import { CreateBluesheetPage } from './create-bluesheet.page';
import { BluesheetComponentModule } from '../../component/bluesheet/bluesheet-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BluesheetComponentModule,
    CreateBluesheetPageRoutingModule
  ],
  declarations: [CreateBluesheetPage]
})
export class CreateBluesheetPageModule {}
