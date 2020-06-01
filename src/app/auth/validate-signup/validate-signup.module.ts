import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidateSignupPageRoutingModule } from './validate-signup-routing.module';

import { ValidateSignupPage } from './validate-signup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidateSignupPageRoutingModule
  ],
  declarations: [ValidateSignupPage]
})
export class ValidateSignupPageModule {}
