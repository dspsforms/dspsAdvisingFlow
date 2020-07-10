import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { Aap2Component } from './aap2.component';
import { Aap2headerComponent } from './aap2header/aap2header.component';
// import { ProgressObjPart1Component } from './progress-obj-part1/progress-obj-part1.component';
import { ProgressObjPart2Component } from './progress-obj-part2/progress-obj-part2.component';
import { LabelYesNoComponentModule } from '../label-yes-no/label-yes-no.module';
import { RequiredFieldPromptComponentModule } from '../required-field-prompt/required-field-prompt.module';
import { SigCreateModule } from '../sig-create/sig-create.module';
import { SigViewModule } from '../sig-view/sig-view.module';
import { FindMyEmailComponentModule } from '../find-my-email/find-my-email.module';
import { LongTermEdGoalComponent } from './long-term-ed-goal/long-term-ed-goal.component';
import { Aap2ChildComponent } from './aap2-child/aap2-child.component';
import { Aap2InfoComponent } from './aap2-info/aap2-info.component';
import { ProgressObjComponent } from './progress-obj/progress-obj.component';
import { SignItModule } from '../sign-it/sign-it.module';
import { JointSigViewModule } from '../joint-sig-view/joint-sig-view.module';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        LabelYesNoComponentModule,
        RequiredFieldPromptComponentModule,
        SigCreateModule,
        SigViewModule,
        SignItModule,
        FindMyEmailComponentModule,
        JointSigViewModule,
        RouterModule
    ],
    exports: [
        Aap2Component,
        Aap2headerComponent,
        LongTermEdGoalComponent,
        // ProgressObjPart1Component,
        ProgressObjPart2Component,
        Aap2ChildComponent,
        Aap2InfoComponent,
        ProgressObjComponent
    ],
    declarations: [
        Aap2Component,
        Aap2headerComponent,
        LongTermEdGoalComponent,
        // ProgressObjPart1Component,
        ProgressObjPart2Component,
        Aap2ChildComponent,
        Aap2InfoComponent,
        ProgressObjComponent
    ]
})
export class Aap2ComponentModule {}