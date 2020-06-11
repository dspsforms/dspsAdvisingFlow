import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';
import { PaginationComponentModule } from '../component/pagination/pagination-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginationComponentModule,
    ListPageRoutingModule
  ],
  declarations: [ListPage]
})
export class ListPageModule {}
