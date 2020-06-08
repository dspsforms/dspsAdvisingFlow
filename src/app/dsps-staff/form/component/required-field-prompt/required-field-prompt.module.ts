import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { RequiredFieldPromptComponent } from './required-field-prompt.component';



@NgModule({
    imports: [
        CommonModule,
        IonicModule,
    ],
    exports: [
        RequiredFieldPromptComponent
    ],
    declarations: [
        RequiredFieldPromptComponent
    ]
})
export class RequiredFieldPromptComponentModule { }
