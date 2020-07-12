import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthDspsGuard } from '../auth/guard/auth-dsps.guard';
import { DspsStaffPage } from './dsps-staff.page';

const routes: Routes = [
  {
    path: '',
    component: DspsStaffPage,
    children: [
      {
        path: '',
        redirectTo: '/dsps-staff/dsps-intro',
        pathMatch: 'full'
      },
      {
        path: 'dsps-intro',
        loadChildren: () => import('./dsps-intro/dsps-intro.module').then( m => m.DspsIntroPageModule)
      },
      {
        path: 'search/:searchTerm',
        loadChildren: () => import('./form/search-res/search-res.module').then(m => m.SearchResPageModule),
        canLoad: [AuthDspsGuard]
      },
      {
        path: 'student/:collegeId',
        loadChildren: () => import('./form/forms-for-a-student/forms-for-a-student.module').then(m => m.FormsForAStudentPageModule),
        canLoad: [AuthDspsGuard]
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            redirectTo: '/dsps-staff/users/list-students',
            pathMatch: 'full'
          },
          {
            path: 'list-students',
            loadChildren: () => import('./user/list-students/list-students.module').then( m => m.ListStudentsPageModule)
          },
          {
            path: 'list-dsps-users',
            loadChildren: () => import('./user/list-users/list-users.module').then(m => m.ListUsersPageModule),
            canLoad: [AuthDspsGuard]
          },
          // TODO
          // {
          //   path: 'instructors',
          //   loadChildren: () => import('../user/list-users/list-users.module').then( m => m.ListUsersPageModule),
          //   canLoad: [AuthAdminGuard]
          // },
          // {
          //   path: 'students',
          //   loadChildren: () => import('../user/list-users/list-users.module').then( m => m.ListUsersPageModule),
          //   canLoad: [AuthAdminGuard]
          // }
        ]
      },
      {
        path: 'form',
        children: [
          {
            path: '',
            loadChildren: () => import('./form/form.module').then(m => m.FormPageModule),
            canLoad: [AuthDspsGuard]
          },
          {
            // illegal
            path: 'create',
            redirectTo: '/dsps-staff',
            pathMatch: 'full'
          },
          {
            path: 'create/:formName',
            loadChildren: () => import('./form/create/create.module').then(m => m.CreatePageModule),
            canLoad: [AuthDspsGuard]
          },
          {
            // illegal
            path: 'view',
            redirectTo: '/dsps-staff',
            pathMatch: 'full'
          },
          {
            // a student may have more than one form. e.g., if a previous one was deleted
            path: 'view/:formName/:formId',
            loadChildren: () => import('./form/view/view.module').then(m => m.ViewPageModule),
            canLoad: [AuthDspsGuard]
          },
          {
            // hack add a dummy param to force reload
            // a student may have more than one form. e.g., if a previous one was deleted
            path: 'view/:formName/:formId/:junk',
            loadChildren: () => import('./form/view/view.module').then(m => m.ViewPageModule),
            canLoad: [AuthDspsGuard]
          },
          {
            // illegal
            path: 'edit',
            redirectTo: '/dsps-staff',
            pathMatch: 'full'
          },
          {
            path: 'edit/:formName/:formId',
            loadChildren: () => import('./form/edit/edit.module').then(m => m.EditPageModule),
            canLoad: [AuthDspsGuard]
          },
          {
            path: 'list/:formName',
            loadChildren: () => import('./form/list/list.module').then(m => m.ListPageModule),
            canLoad: [AuthDspsGuard]
          },
          

        ]
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DspsStaffPageRoutingModule {}
