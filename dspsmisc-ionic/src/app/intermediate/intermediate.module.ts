import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntermediatePageRoutingModule } from './intermediate-routing.module';

import { IntermediatePage } from './intermediate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntermediatePageRoutingModule
  ],
  declarations: [IntermediatePage]
})
export class IntermediatePageModule {}
