import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SigCreateComponent } from './sig-create.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [SigCreateComponent],
  declarations: [SigCreateComponent],
  entryComponents: [SigCreateComponent]
})
export class SigCreateModule {}
