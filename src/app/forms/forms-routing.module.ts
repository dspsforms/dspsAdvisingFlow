import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsPage } from './forms.page';

const routes: Routes = [
  {
    path: '',
    component: FormsPage,
    children: [
      {
        path: '',
        redirectTo: '/forms/bluesheet',
        pathMatch: 'full'
      },
      {
        path: 'bluesheet',
        children: [
          {
            path: '',
            loadChildren: () => import('./bluesheet/bluesheet.module').then( m => m.BluesheetPageModule)
          },
          {
            path: 'create',
            loadChildren: () => import('./bluesheet/create-bluesheet/create-bluesheet.module').then( m => m.CreateBluesheetPageModule)
          },
          {
            path: 'view',
            redirectTo: '/forms/bluesheet',
            pathMatch: 'full'
          },
          {
            // a student may have more than one form. e.g., if a previous one was deleted
            path: 'view/:formId',
            loadChildren: () => import('./bluesheet/view-bluesheet/view-bluesheet.module').then( m => m.ViewBluesheetPageModule)
          },
          {
            path: 'edit',
            redirectTo: '/forms/bluesheet',
            pathMatch: 'full'
          },
          {
            path: 'edit/:formId',
            loadChildren: () => import('./bluesheet/edit-bluesheet/edit-bluesheet.module').then( m => m.EditBluesheetPageModule)
          }

        ]
      },
      {
        path: 'accomplan',
        children: [
          {
            path: '',
            loadChildren: () => import('./accomplan/accomplan.module').then( m => m.AccomplanPageModule)
          },
          {
            path: 'create',
            loadChildren: () => import('./accomplan/create-accomplan/create-accomplan.module').then( m => m.CreateAccomplanPageModule)
          },
          {
            path: 'view',
            redirectTo: '/forms/accomplan',
            pathMatch: 'full'
          },
          {
            path: 'view/:formId',
            loadChildren: () => import('./accomplan/view-accomplan/view-accomplan.module').then( m => m.ViewAccomplanPageModule)
          },
          {
            path: 'edit',
            redirectTo: '/forms/accomplan',
            pathMatch: 'full'
          },
          {
            path: 'edit/:formId',
            loadChildren: () => import('./accomplan/edit-accomplan/edit-accomplan.module').then( m => m.EditAccomplanPageModule)
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsPageRoutingModule {}
