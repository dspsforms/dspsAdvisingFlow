import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { GreensheetComponent } from './greensheet.component';
import { DisabilityServicesComponent } from './disability-services/disability-services.component';
import { DisabilityServicesContainerComponent } from './disability-services-container/disability-services-container.component';
import { LabelYesNoComponentModule } from '../label-yes-no/label-yes-no.module';
import { StudentPart2Component } from './student-part2/student-part2.component';
import { StudentPersonalInfoComponent } from './student-personal-info/student-personal-info.component';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        LabelYesNoComponentModule,
        RouterModule
    ],
    exports: [
        GreensheetComponent,
        DisabilityServicesComponent,
        DisabilityServicesContainerComponent,
        StudentPart2Component,
        StudentPersonalInfoComponent,
    ],
    declarations: [
        GreensheetComponent,
        DisabilityServicesComponent,
        DisabilityServicesContainerComponent,
        StudentPart2Component,
        StudentPersonalInfoComponent,
    ]
})
export class GreesheetComponentModule {}