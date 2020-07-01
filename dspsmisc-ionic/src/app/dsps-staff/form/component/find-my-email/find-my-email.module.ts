import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FindMyEmailComponent } from './find-my-email.component';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule
    ],
    exports: [
        FindMyEmailComponent
    ],
    declarations: [
        FindMyEmailComponent
    ]
})
export class FindMyEmailComponentModule { }
