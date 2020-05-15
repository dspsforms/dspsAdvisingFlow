import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { Aap1Component } from './aap1.component';
import { Aap1headerComponent } from './aap1header/aap1header.component';
import { ElemWithSignComponentModule } from '../elem-with-sig/elem-with-sig.module';
import { WrittenCourseReqComponent } from './written-course-req/written-course-req.component';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        ElemWithSignComponentModule,
        RouterModule
    ],
    exports: [
        Aap1Component,
        Aap1headerComponent,
        WrittenCourseReqComponent
    ],
    declarations: [
        Aap1Component,
        Aap1headerComponent,
        WrittenCourseReqComponent
    ]
})
export class Aap1ComponentModule {}