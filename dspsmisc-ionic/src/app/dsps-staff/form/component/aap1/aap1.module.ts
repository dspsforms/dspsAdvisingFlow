import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { Aap1Component } from './aap1.component';
import { Aap1headerComponent } from './aap1header/aap1header.component';
import { ElemWithSignComponentModule } from '../elem-with-sig/elem-with-sig.module';
import { WrittenCourseReqComponent } from './written-course-req/written-course-req.component';
import { MovingAroundCampusComponent } from './moving-around-campus/moving-around-campus.component';
import { CareerComponent } from './career/career.component';
import { DevelopSkillsComponent } from './develop-skills/develop-skills.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { HealthRelatedSupportComponent } from './health-related-support/health-related-support.component';
import { HearLecturesComponent } from './hear-lectures/hear-lectures.component';
import { OtherComponent } from './other/other.component';
import { PersonalIssuesComponent } from './personal-issues/personal-issues.component';
import { PlanClassesComponent } from './plan-classes/plan-classes.component';
import { TestsComponent } from './tests/tests.component';
import { VisualAidsComponent } from './visual-aids/visual-aids.component';
import { ExtendedTimeWithSigComponent } from './tests/extended-time-with-sig/extended-time-with-sig.component';
import { Aap1footerComponent } from './aap1footer/aap1footer.component';
import { RequiredFieldPromptComponentModule } from '../required-field-prompt/required-field-prompt.module';
import { SigViewModule } from '../sig-view/sig-view.module';
import { SigCreateModule } from '../sig-create/sig-create.module';
import { LongTermEdGoalComponent } from './long-term-ed-goal/long-term-ed-goal.component';
import { FindMyEmailComponentModule } from '../find-my-email/find-my-email.module';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        ElemWithSignComponentModule,
        RequiredFieldPromptComponentModule,
        SigViewModule,
        SigCreateModule,
        FindMyEmailComponentModule,
        RouterModule
    ],
    exports: [
        Aap1Component,
        Aap1headerComponent,
        Aap1footerComponent,
        CareerComponent,
        DevelopSkillsComponent,
        FacilitiesComponent,
        HealthRelatedSupportComponent,
        HearLecturesComponent,
        MovingAroundCampusComponent,
        OtherComponent,
        PersonalIssuesComponent,
        PlanClassesComponent,
        TestsComponent,
        VisualAidsComponent,
        WrittenCourseReqComponent,
        ExtendedTimeWithSigComponent,
        LongTermEdGoalComponent
    ],
    declarations: [
        Aap1Component,
        Aap1headerComponent,
        Aap1footerComponent,
        CareerComponent,
        DevelopSkillsComponent,
        FacilitiesComponent,
        HealthRelatedSupportComponent,
        HearLecturesComponent,
        MovingAroundCampusComponent,
        OtherComponent,
        PersonalIssuesComponent,
        PlanClassesComponent,
        TestsComponent,
        VisualAidsComponent,
        WrittenCourseReqComponent,
        ExtendedTimeWithSigComponent,
        LongTermEdGoalComponent
    ]
})
export class Aap1ComponentModule {}