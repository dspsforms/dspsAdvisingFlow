import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LastModifiedComponent } from './last-modified.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [ LastModifiedComponent ],
  declarations: [LastModifiedComponent]
})
export class LastModifiedModule {}
