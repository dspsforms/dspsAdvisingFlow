import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPage } from './view.page';
import { ConfirmDeactivate } from 'src/app/util/confirm-deactivate';

const routes: Routes = [
  {
    path: '',
    component: ViewPage,
    canDeactivate: [ConfirmDeactivate] // for Aap2 child that may be dirty
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPageRoutingModule {}
