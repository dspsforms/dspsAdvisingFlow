import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateBluesheetPage } from './create-bluesheet.page';

const routes: Routes = [
  {
    path: '',
    component: CreateBluesheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateBluesheetPageRoutingModule {}
