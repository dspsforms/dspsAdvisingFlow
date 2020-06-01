import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentSignupPageRoutingModule } from './student-signup-routing.module';

import { StudentSignupPage } from './student-signup.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    StudentSignupPageRoutingModule
  ],
  declarations: [StudentSignupPage]
})
export class StudentSignupPageModule {}
