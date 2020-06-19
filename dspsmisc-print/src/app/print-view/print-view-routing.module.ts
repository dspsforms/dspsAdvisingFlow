import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenericComponent } from './generic/generic.component';


// todo: create guards

const routes: Routes = [
  {
    path: '',
    redirectTo: 'generic',
    pathMatch: 'full'
  },
  {
    path: 'generic',
    component: GenericComponent // no Guard
  },
  {
    path: 'view/:formName/:formId',
    loadChildren: () => import('./view-form/view-form.module').then( m => m.ViewFormComponentModule)
    // component: ViewFormComponent,
    // canActivate: [SomeGuard]  // TODO
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintViewRoutingModule {}
