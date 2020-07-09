import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { ElemWithSigComponent } from './elem-with-sig.component';
import { LabelValuePrintModule } from '../label-value-print/label-value-print.module';
import { CheckboxGridModule } from '../checkbox-grid/checkbox-grid.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LabelValuePrintModule,
        CheckboxGridModule,
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
