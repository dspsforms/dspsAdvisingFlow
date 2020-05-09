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
        redirectTo: '/dsps-staff/form',
        pathMatch: 'full'
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            redirectTo: '/dsps-staff/users/list-dsps-users',
            pathMatch: 'full'
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
          }

        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DspsStaffPageRoutingModule {}
