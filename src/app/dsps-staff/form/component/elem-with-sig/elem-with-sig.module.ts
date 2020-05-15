import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ElemWithSigComponent } from './elem-with-sig.component';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        ElemWithSigComponent
    ],
    declarations: [
        ElemWithSigComponent
    ]
})
export class ElemWithSignComponentModule {}