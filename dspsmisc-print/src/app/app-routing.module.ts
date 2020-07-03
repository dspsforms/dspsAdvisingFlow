import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'not-found',
    pathMatch: 'full'
  },
  // print/view/bluesheet/5efd6cc5779b154c708c68d3
  {
    path: 'print/view/:formName/:formId',
    loadChildren: () => import('./print-view/view-form/view-form.module').then( m => m.ViewFormComponentModule)
  },

  {
    path: 'not-found',
    component: NotFoundComponent
  },
  // {
  //   path: 'print',
  //   loadChildren: () => import('./print-view/print-view.module').then( m => m.PrintViewModule)
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
