import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LabelValuePrintComponent } from './label-value-print.component';
import { CheckboxGridModule } from '../checkbox-grid/checkbox-grid.module';


@NgModule({
    imports: [
        CommonModule,
        CheckboxGridModule,
        RouterModule
    ],
    exports: [
        LabelValuePrintComponent
    ],
    declarations: [
        LabelValuePrintComponent,
    ]
})
export class LabelValuePrintModule {}
