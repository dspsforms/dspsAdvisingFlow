import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthDspsGuard } from './auth/guard/auth-dsps.guard';

const routes: Routes = [
  {
    // landing page will decide where user is directed...
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  // {
  //   path: 'forms',
  //   loadChildren: () => import('./forms/forms.module').then(m => m.FormsPageModule),
  //   canLoad: [AuthDspsGuard]
  // },
  {
    path: 'dsps-staff',
    loadChildren: () => import('./dsps-staff/dsps-staff.module').then(m => m.DspsStaffPageModule),
    canLoad: [AuthDspsGuard]
  
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then( m => m.StudentPageModule)
  },
  {
    path: 'instructor',
    loadChildren: () => import('./instructor/instructor.module').then( m => m.InstructorPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'print-view/:formName/:formId' ,
    loadChildren: () => import('./print-view/print-view.module').then(m => m.PrintViewPageModule),
    // canLoad: [AuthFooGuard]  -- TODO create a new guard that will allow student to see their's
    // instructor to see what they have a right to see, and dsps to see everything
  },
 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
