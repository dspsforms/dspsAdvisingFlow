import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LabelValuePrintComponent } from './label-value-print.component';
import { CheckboxGridComponent } from '../checkbox-grid/checkbox-grid.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        CheckboxGridComponent,
        LabelValuePrintComponent
    ],
    declarations: [
        CheckboxGridComponent,
        LabelValuePrintComponent,
    ]
})
export class LabelValuePrintModule {}
