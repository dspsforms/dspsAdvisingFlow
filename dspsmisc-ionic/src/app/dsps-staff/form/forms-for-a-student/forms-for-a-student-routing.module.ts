import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsForAStudentPage } from './forms-for-a-student.page';

const routes: Routes = [
  {
    path: '',
    component: FormsForAStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsForAStudentPageRoutingModule {}
