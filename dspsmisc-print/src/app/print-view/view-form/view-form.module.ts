import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ElemWithSignComponentModule } from '../../dsps-staff/form/component/elem-with-sig/elem-with-sig.module';
import { SigViewModule } from '../../dsps-staff/form/component/sig-view/sig-view.module';
import { Aap1ComponentModule } from '../../dsps-staff/form/component/aap1/aap1.module';
import { ViewFormComponent } from './view-form.component';
import { ViewFormRoutingModule } from './view-form-routing.module';
import { BluesheetComponentModule } from 'src/app/dsps-staff/form/component/bluesheet/bluesheet-component.module';
import { GreesheetComponentModule } from 'src/app/dsps-staff/form/component/greensheet/greensheet.module';
import { MatProgressSpinnerModule } from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        ElemWithSignComponentModule,
        SigViewModule,
        Aap1ComponentModule,
        BluesheetComponentModule,
        GreesheetComponentModule,
        ViewFormRoutingModule
    ],
    declarations: [
       ViewFormComponent
  ],

})
export class ViewFormComponentModule {}
