import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BluesheetPageRoutingModule } from './bluesheet-routing.module';

import { BluesheetPage } from './bluesheet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BluesheetPageRoutingModule
  ],
  declarations: [BluesheetPage]
})
export class BluesheetPageModule {}
