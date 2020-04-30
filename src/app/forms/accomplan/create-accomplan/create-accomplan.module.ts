import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAccomplanPageRoutingModule } from './create-accomplan-routing.module';

import { CreateAccomplanPage } from './create-accomplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAccomplanPageRoutingModule
  ],
  declarations: [CreateAccomplanPage]
})
export class CreateAccomplanPageModule {}
