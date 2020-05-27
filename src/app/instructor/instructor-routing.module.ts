import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorPage } from './instructor.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorPageRoutingModule {}
