import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CheckboxGridComponent } from './checkbox-grid.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [ CheckboxGridComponent ],
  declarations: [CheckboxGridComponent]
})
export class CheckboxGridModule {}
