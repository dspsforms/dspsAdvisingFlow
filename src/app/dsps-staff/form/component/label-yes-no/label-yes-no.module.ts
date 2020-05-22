import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LabelYesNoComponent } from './label-yes-no.component';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        LabelYesNoComponent
    ],
    declarations: [
        LabelYesNoComponent
    ]
})
export class LabelYesNoComponentModule {}