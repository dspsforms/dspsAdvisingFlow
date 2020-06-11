import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyEmailMsgPageRoutingModule } from './verify-email-msg-routing.module';

import { VerifyEmailMsgPage } from './verify-email-msg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyEmailMsgPageRoutingModule
  ],
  declarations: [VerifyEmailMsgPage]
})
export class VerifyEmailMsgPageModule {}
