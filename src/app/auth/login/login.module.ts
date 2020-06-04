import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';


import { LoginPage } from './login.page';
import { ResetPasswordStep1Component } from '../reset-password-step1/reset-password-step1.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoginPageRoutingModule
  ],
  declarations: [
    LoginPage,
    ResetPasswordStep1Component
  ],
  entryComponents: [
    ResetPasswordStep1Component
  ]
 
})
export class LoginPageModule {}
