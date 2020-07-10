import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { JointSigViewComponent } from './joint-sig-view.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [ JointSigViewComponent ],
  declarations: [JointSigViewComponent]
})
export class JointSigViewModule {}
