import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GreensheetComponent } from './greensheet.component';
import { DisabilityServicesComponent } from './disability-services/disability-services.component';
import { DisabilityServicesContainerComponent } from './disability-services-container/disability-services-container.component';
import { StudentPart3Component } from './student-part3/student-part3.component';
import { LabelYesNoComponentModule } from '../label-yes-no/label-yes-no.module';
import { StudentPersonalInfoComponent } from './student-personal-info/student-personal-info.component';
import { StudentPart2Component } from './student-part2/student-part2.component';
import { LabelValuePrintModule } from '../label-value-print/label-value-print.module';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LabelYesNoComponentModule,
        LabelValuePrintModule, // for app-checkbox-grid
        // RequiredFieldPromptComponentModule,
        RouterModule
    ],
    exports: [
        GreensheetComponent,
        DisabilityServicesComponent,
        DisabilityServicesContainerComponent,
        StudentPart2Component,
        StudentPart3Component,
        StudentPersonalInfoComponent,
    ],
    declarations: [
        GreensheetComponent,
        DisabilityServicesComponent,
        DisabilityServicesContainerComponent,
        StudentPart2Component,
        StudentPart3Component,
        StudentPersonalInfoComponent,
    ]
})
export class GreesheetComponentModule {}
