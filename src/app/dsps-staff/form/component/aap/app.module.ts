import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AapComponent } from './aap.component';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        AapComponent
    ],
    declarations: [
        AapComponent
    ]
})
export class AapComponentModule {}