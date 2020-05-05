import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseForm } from './baseform.model';
import { CheckBoxElem, CheckBoxForm } from './checkbox-form.model';



@NgModule({
  imports: [
    CommonModule,
    ],
    exports:[BaseForm, CheckBoxElem, CheckBoxForm],
  declarations: [BaseForm, CheckBoxElem, CheckBoxForm]
})
export class AppModelsModule {}
