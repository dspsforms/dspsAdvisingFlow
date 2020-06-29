import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleSignOnPage } from './single-sign-on.page';

const routes: Routes = [
  {
    path: '',
    component: SingleSignOnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleSignOnPageRoutingModule {}
