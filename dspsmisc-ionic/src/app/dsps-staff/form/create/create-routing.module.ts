import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePage } from './create.page';
import { ConfirmDeactivate } from 'src/app/util/confirm-deactivate';

const routes: Routes = [
  {
    path: '',
    component: CreatePage,
    canDeactivate: [ConfirmDeactivate]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePageRoutingModule {}
