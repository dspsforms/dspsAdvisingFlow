import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBluesheetPageRoutingModule } from './edit-bluesheet-routing.module';

import { EditBluesheetPage } from './edit-bluesheet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditBluesheetPageRoutingModule
  ],
  declarations: [EditBluesheetPage]
})
export class EditBluesheetPageModule {}
