import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentTabsPage } from './student-tabs.page';
import { AuthStudentGuard } from '../auth/guard/auth-student.guard';

const routes: Routes = [
  {
    path: '',
    component: StudentTabsPage,
  
    children: [
      {
        path: '',
        redirectTo: '/student/student-list',
        pathMatch: 'full'
      },
      {
        path: 'student-list',
        loadChildren: () => import('./student-list/student-list.module').then(m => m.StudentListPageModule),
        canLoad: [AuthStudentGuard]
      },
      {
        path: 'student-view-form/:formName/:formId',
        loadChildren: () => import('./student-view-form/student-view-form.module').then(m => m.StudentViewFormPageModule),
        canLoad: [AuthStudentGuard]
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentTabsPageRoutingModule {}
