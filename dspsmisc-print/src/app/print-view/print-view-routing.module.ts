import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenericComponent } from './generic/generic.component';
import { ViewFormComponent } from './view-form/view-form.component';

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
    component: ViewFormComponent,
    // canActivate: [SomeGuard]  // TODO
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintViewRoutingModule {}
