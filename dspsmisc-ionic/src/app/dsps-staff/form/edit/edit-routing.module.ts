import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPage } from './edit.page';
import { ConfirmDeactivate } from 'src/app/util/confirm-deactivate';

const routes: Routes = [
  {
    path: '',
    component: EditPage,
    canDeactivate: [ConfirmDeactivate]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPageRoutingModule {}
