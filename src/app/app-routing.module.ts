import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthDspsGuard } from './auth/guard/auth-dsps.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dsps-staff',
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
 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
