import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAccomplanPage } from './view-accomplan.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAccomplanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAccomplanPageRoutingModule {}
