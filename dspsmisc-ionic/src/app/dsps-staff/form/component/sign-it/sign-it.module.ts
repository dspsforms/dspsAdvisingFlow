import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SignItComponent } from './sign-it.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [ SignItComponent ],
  declarations: [SignItComponent]
})
export class SignItModule {}
