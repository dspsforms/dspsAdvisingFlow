import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordStep2PageRoutingModule } from './reset-password-step2-routing.module';

import { ResetPasswordStep2Page } from './reset-password-step2.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ResetPasswordStep2PageRoutingModule
  ],
  declarations: [ResetPasswordStep2Page]
})
export class ResetPasswordStep2PageModule {}
