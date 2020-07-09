import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CompletedByComponent } from './completed-by.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [ CompletedByComponent ],
  declarations: [CompletedByComponent]
})
export class CompletedByModule {}
