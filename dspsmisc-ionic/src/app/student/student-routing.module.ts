import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentPage } from './student.page';

const routes: Routes = [
  {
    path: '',
    component: StudentPage
  },
  {
    path: 'student-view-form/:formName/:formId',
    loadChildren: () => import('./student-view-form/student-view-form.module').then( m => m.StudentViewFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPageRoutingModule {}
