import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SigViewComponent } from './sig-view.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [ SigViewComponent ],
  declarations: [SigViewComponent]
})
export class SigViewModule {}
