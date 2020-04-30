import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccomplanPageRoutingModule } from './accomplan-routing.module';

import { AccomplanPage } from './accomplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccomplanPageRoutingModule
  ],
  declarations: [AccomplanPage]
})
export class AccomplanPageModule {}
