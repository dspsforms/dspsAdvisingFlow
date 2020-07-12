import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthDspsGuard } from './auth/guard/auth-dsps.guard';
import { AuthStudentGuard } from './auth/guard/auth-student.guard';

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
  {
    path: 'dsps-staff',
    loadChildren: () => import('./dsps-staff/dsps-staff.module').then(m => m.DspsStaffPageModule),
    canLoad: [AuthDspsGuard]
  
  },
  {
    path: 'student',
    loadChildren: () => import('./student-tabs/student-tabs.module').then( m => m.StudentTabsPageModule),
    canLoad: [AuthStudentGuard]
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
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      // onSameUrlNavigation: 'reload' // does not work
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
