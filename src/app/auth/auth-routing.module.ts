import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
import { AuthAdminGuard } from './guard/auth-admin.guard';
import { IsloggedinGuardGuard } from './guard/isloggedin-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'add-new-staff',
    loadChildren: () => import('./add-new-staff/add-new-staff.module').then( m => m.AddNewStaffPageModule),
    canLoad: [AuthAdminGuard]
  },
  {
    path: 'student-signup',
    loadChildren: () => import('./student-signup/student-signup.module').then( m => m.StudentSignupPageModule)
  },
  {
    path: 'validate-signup/:randomKey',
    loadChildren: () => import('./validate-signup/validate-signup.module').then( m => m.ValidateSignupPageModule)
  },
  {
    path: 'verify-email-msg',
    loadChildren: () => import('./verify-email-msg/verify-email-msg.module').then( m => m.VerifyEmailMsgPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule),
    canLoad: [IsloggedinGuardGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
