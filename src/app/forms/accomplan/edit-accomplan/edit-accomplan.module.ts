import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAccomplanPageRoutingModule } from './edit-accomplan-routing.module';

import { EditAccomplanPage } from './edit-accomplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAccomplanPageRoutingModule
  ],
  declarations: [EditAccomplanPage]
})
export class EditAccomplanPageModule {}
