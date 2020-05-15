import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { Aap2Component } from './aap2.component';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        Aap2Component
    ],
    declarations: [
        Aap2Component
    ]
})
export class Aap2ComponentModule {}