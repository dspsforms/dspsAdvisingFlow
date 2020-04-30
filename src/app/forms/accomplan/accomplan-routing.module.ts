import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccomplanPage } from './accomplan.page';

const routes: Routes = [
  {
    path: '',
    component: AccomplanPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccomplanPageRoutingModule {}
