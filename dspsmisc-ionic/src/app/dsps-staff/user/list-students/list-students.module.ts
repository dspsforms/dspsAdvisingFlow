import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListStudentsPageRoutingModule } from './list-students-routing.module';

import { ListStudentsPage } from './list-students.page';
import { SearchModule } from '../../form/component/search/search.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchModule,
    ListStudentsPageRoutingModule
  ],
  declarations: [ListStudentsPage]
})
export class ListStudentsPageModule {}
