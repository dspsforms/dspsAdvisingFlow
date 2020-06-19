import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ElemWithSignComponentModule } from '../../dsps-staff/form/component/elem-with-sig/elem-with-sig.module';
import { SigViewModule } from '../../dsps-staff/form/component/sig-view/sig-view.module';
import { Aap1ComponentModule } from '../../dsps-staff/form/component/aap1/aap1.module';
import { ViewFormComponent } from './view-form.component';
import { ViewFormRoutingModule } from './view-form-routing.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ElemWithSignComponentModule,
        SigViewModule,
        Aap1ComponentModule,
        ViewFormRoutingModule
    ],
    declarations: [
       ViewFormComponent
  ],

})
export class ViewFormComponentModule {}