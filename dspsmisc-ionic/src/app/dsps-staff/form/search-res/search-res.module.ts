import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchResPageRoutingModule } from './search-res-routing.module';

import { SearchResPage } from './search-res.page';
import { SearchModule } from '../component/search/search.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchModule,
    SearchResPageRoutingModule
  ],
  declarations: [SearchResPage]
})
export class SearchResPageModule {}
