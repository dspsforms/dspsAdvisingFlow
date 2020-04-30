import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewBluesheetPage } from './view-bluesheet.page';

const routes: Routes = [
  {
    path: '',
    component: ViewBluesheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewBluesheetPageRoutingModule {}
