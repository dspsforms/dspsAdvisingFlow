import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BluesheetPage } from './bluesheet.page';

const routes: Routes = [
  {
    path: '',
    component: BluesheetPage
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BluesheetPageRoutingModule {}
