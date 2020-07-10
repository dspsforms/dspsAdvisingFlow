import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Aap2Component } from './aap2.component';
import { Aap2headerComponent } from './aap2header/aap2header.component';
import { LastModifiedModule } from '../last-modified/last-modified.module';

// import { SigCreateModule } from '../sig-create/sig-create.module';
import { SigViewModule } from '../sig-view/sig-view.module';
import { Aap2InfoComponent } from './aap2-info/aap2-info.component';
import { LongTermEdGoalComponent } from './long-term-ed-goal/long-term-ed-goal.component';
import { CompletedByModule } from '../completed-by/completed-by.module';
import { CheckboxGridModule } from '../checkbox-grid/checkbox-grid.module';
import { Aap2ChildComponent } from './aap2-child/aap2-child.component';
import { ProgressObjPart2Component } from './progress-obj-part2/progress-obj-part2.component';
import { ProgressObjComponent } from './progress-obj/progress-obj.component';
import { LabelValuePrintModule } from '../label-value-print/label-value-print.module';
import { LabelYesNoComponentModule } from '../label-yes-no/label-yes-no.module';
import { JointSigViewModule } from '../joint-sig-view/joint-sig-view.module';

// import { SignItModule } from '../sign-it/sign-it.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CheckboxGridModule,
        LastModifiedModule,
        CompletedByModule,
        LabelValuePrintModule,
        LabelYesNoComponentModule,
        JointSigViewModule,
        // RequiredFieldPromptComponentModule,
        // SigCreateModule,
        SigViewModule,
        // SignItModule,
        // FindMyEmailComponentModule,
        RouterModule
    ],
    exports: [
        Aap2Component,
        Aap2headerComponent,
        LongTermEdGoalComponent,
        ProgressObjPart2Component,
        Aap2ChildComponent,
        Aap2InfoComponent,
        ProgressObjComponent
    ],
    declarations: [
        Aap2Component,
        Aap2headerComponent,
        LongTermEdGoalComponent,
        ProgressObjPart2Component,
        Aap2ChildComponent,
        Aap2InfoComponent,
        ProgressObjComponent
    ]
})
export class Aap2ComponentModule {}
