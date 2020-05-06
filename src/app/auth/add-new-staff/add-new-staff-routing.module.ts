import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewStaffPage } from './add-new-staff.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewStaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewStaffPageRoutingModule {}
