import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentSignupPage } from './student-signup.page';

const routes: Routes = [
  {
    path: '',
    component: StudentSignupPage
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentSignupPageRoutingModule {}
