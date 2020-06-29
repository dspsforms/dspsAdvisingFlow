import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleSignOnPageRoutingModule } from './single-sign-on-routing.module';

import { SingleSignOnPage } from './single-sign-on.page';
import { MainSiteCommunicatorComponent } from './main-site-communicator/main-site-communicator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleSignOnPageRoutingModule
  ],
  declarations: [SingleSignOnPage,
    MainSiteCommunicatorComponent
  ]
})
export class SingleSignOnPageModule {}
