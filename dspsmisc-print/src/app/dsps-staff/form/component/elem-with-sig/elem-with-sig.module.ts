import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { ElemWithSigComponent } from './elem-with-sig.component';
import { LabelValuePrintModule } from '../label-value-print/label-value-print.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LabelValuePrintModule,
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
