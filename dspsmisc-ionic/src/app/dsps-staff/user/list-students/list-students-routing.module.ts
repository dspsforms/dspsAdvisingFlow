import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListStudentsPage } from './list-students.page';

const routes: Routes = [
  {
    path: '',
    component: ListStudentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListStudentsPageRoutingModule {}
