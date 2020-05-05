import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AddNewStaffComponent } from './add-new-staff/add-new-staff.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    AddNewStaffComponent,
    LoginComponent,
  
  ],
  declarations: [
    AddNewStaffComponent,
    LoginComponent,

  ]
})
export class AuthComponentModule {}