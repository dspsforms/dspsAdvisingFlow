import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentSignupPageRoutingModule } from './student-signup-routing.module';

import { StudentSignupPage } from './student-signup.page';
import { FindMyEmailComponentModule } from 'src/app/dsps-staff/form/component/find-my-email/find-my-email.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FindMyEmailComponentModule,
    StudentSignupPageRoutingModule
  ],
  declarations: [StudentSignupPage]
})
export class StudentSignupPageModule {}
