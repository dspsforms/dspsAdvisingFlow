import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAccomplanPageRoutingModule } from './view-accomplan-routing.module';

import { ViewAccomplanPage } from './view-accomplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAccomplanPageRoutingModule
  ],
  declarations: [ViewAccomplanPage]
})
export class ViewAccomplanPageModule {}
