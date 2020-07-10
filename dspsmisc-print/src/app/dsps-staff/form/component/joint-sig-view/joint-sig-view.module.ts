import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JointSigViewComponent } from './joint-sig-view.component';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [ JointSigViewComponent ],
  declarations: [JointSigViewComponent]
})
export class JointSigViewModule {}
