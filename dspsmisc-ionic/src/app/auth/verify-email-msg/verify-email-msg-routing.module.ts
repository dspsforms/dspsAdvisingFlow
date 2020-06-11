import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyEmailMsgPage } from './verify-email-msg.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyEmailMsgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyEmailMsgPageRoutingModule {}
