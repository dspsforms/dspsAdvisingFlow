import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DspsIntroPage } from './dsps-intro.page';

const routes: Routes = [
  {
    path: '',
    component: DspsIntroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DspsIntroPageRoutingModule {}
