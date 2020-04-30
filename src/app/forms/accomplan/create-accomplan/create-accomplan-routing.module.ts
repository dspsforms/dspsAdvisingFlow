import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAccomplanPage } from './create-accomplan.page';

const routes: Routes = [
  {
    path: '',
    component: CreateAccomplanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateAccomplanPageRoutingModule {}
