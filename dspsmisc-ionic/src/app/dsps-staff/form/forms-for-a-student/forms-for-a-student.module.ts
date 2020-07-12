import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormsForAStudentPageRoutingModule } from './forms-for-a-student-routing.module';

import { FormsForAStudentPage } from './forms-for-a-student.page';
import { SearchModule } from '../component/search/search.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchModule,
    FormsForAStudentPageRoutingModule
  ],
  declarations: [FormsForAStudentPage]
})
export class FormsForAStudentPageModule {}
