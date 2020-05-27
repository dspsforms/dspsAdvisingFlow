import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructorPageRoutingModule } from './instructor-routing.module';

import { InstructorPage } from './instructor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructorPageRoutingModule
  ],
  declarations: [InstructorPage]
})
export class InstructorPageModule {}
