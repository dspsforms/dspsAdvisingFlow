import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { AuthComponentModule } from './auth-component.module';
import { AddNewStaffComponent } from './add-new-staff/add-new-staff.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuthComponentModule,
    AuthPageRoutingModule
  ],

  declarations: [AuthPage]
})
export class AuthPageModule {}
