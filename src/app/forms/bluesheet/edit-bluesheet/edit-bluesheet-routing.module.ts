import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBluesheetPage } from './edit-bluesheet.page';

const routes: Routes = [
  {
    path: '',
    component: EditBluesheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBluesheetPageRoutingModule {}
