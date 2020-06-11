import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetPasswordStep2Page } from './reset-password-step2.page';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordStep2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordStep2PageRoutingModule {}
