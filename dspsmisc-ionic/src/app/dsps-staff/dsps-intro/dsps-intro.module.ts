import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DspsIntroPageRoutingModule } from './dsps-intro-routing.module';

import { DspsIntroPage } from './dsps-intro.page';
import { SpacedIconComponent } from './spaced-icon/spaced-icon.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DspsIntroPageRoutingModule
  ],
  declarations: [DspsIntroPage, SpacedIconComponent]
})
export class DspsIntroPageModule {}
