import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListStudentsPageRoutingModule } from './list-students-routing.module';

import { ListStudentsPage } from './list-students.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListStudentsPageRoutingModule
  ],
  declarations: [ListStudentsPage]
})
export class ListStudentsPageModule {}
