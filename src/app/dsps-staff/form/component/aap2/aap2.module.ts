import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { Aap2Component } from './aap2.component';
import { Aap2headerComponent } from './aap2header/aap2header.component';
import { LongTermEdGoalComponent } from './long-term-ed-goal/long-term-ed-goal.component';
import { ProgressObjPart1Component } from './progress-obj-part1/progress-obj-part1.component';
import { ProgressObjPart2Component } from './progress-obj-part2/progress-obj-part2.component';
import { LabelYesNoComponentModule } from '../label-yes-no/label-yes-no.module';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        LabelYesNoComponentModule,
        RouterModule
    ],
    exports: [
        Aap2Component,
        Aap2headerComponent,
        LongTermEdGoalComponent,
        ProgressObjPart1Component,
        ProgressObjPart2Component,
    ],
    declarations: [
        Aap2Component,
        Aap2headerComponent,
        LongTermEdGoalComponent,
        ProgressObjPart1Component,
        ProgressObjPart2Component,
    ]
})
export class Aap2ComponentModule {}