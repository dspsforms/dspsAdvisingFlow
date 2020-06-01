import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidateSignupPage } from './validate-signup.page';

const routes: Routes = [
  {
    path: '',
    component: ValidateSignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidateSignupPageRoutingModule {}
