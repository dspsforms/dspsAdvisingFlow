import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewBluesheetPageRoutingModule } from './view-bluesheet-routing.module';

import { ViewBluesheetPage } from './view-bluesheet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewBluesheetPageRoutingModule
  ],
  declarations: [ViewBluesheetPage]
})
export class ViewBluesheetPageModule {}
