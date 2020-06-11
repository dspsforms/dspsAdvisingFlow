import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrintViewPage } from './print-view.page';

const routes: Routes = [
  {
    path: '',
    component: PrintViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintViewPageRoutingModule {}
