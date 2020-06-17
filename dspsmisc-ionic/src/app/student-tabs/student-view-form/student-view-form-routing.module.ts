import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentViewFormPage } from './student-view-form.page';

const routes: Routes = [
  {
    path: '',
    component: StudentViewFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentViewFormPageRoutingModule {}
