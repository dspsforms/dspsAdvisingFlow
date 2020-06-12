import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'print',
    pathMatch: 'full'
  },
  {
    path: 'print',
    loadChildren: () => import('./print-view/print-view.module').then( m => m.PrintViewModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
