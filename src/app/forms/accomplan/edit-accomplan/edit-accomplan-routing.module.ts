import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAccomplanPage } from './edit-accomplan.page';

const routes: Routes = [
  {
    path: '',
    component: EditAccomplanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAccomplanPageRoutingModule {}
