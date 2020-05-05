import { Injectable } from '@angular/core';
import { BlueSheetForm } from './component/bluesheet/model/bluesheet.model';
import { AccomplanForm } from './accomplan/component/accomplan.model';

@Injectable({
  providedIn: 'root'
})
export class FormsService0 {

  private _blueSheetForms: BlueSheetForm[] = [
    {
      id: 'b1',
      studentName: 'Student B1',
      studentId: 'G0-1234',
      imageUrl: '/assets/bluesheet.jpg',
      dateCreated: new Date(),
      lastMod: new Date()
    },
    {
      id: 'b2',
      studentName: 'Student B2',
      studentId: 'G0-2345',
      imageUrl: '/assets/bluesheet.jpg',
      dateCreated: new Date(),
      lastMod: new Date()
    }

  ];


  private _accomPlanForms: AccomplanForm[] = [
    {
      id: 'a1',
      studentName: 'Student A1',
      studentId: 'G0-1234',
      imageUrl: '/assets/accomplan.png',
      dateCreated: new Date(),
      lastMod: new Date()
    },
    {
      id: 'a2',
      studentName: 'Student A2',
      studentId: 'G0-2345',
      imageUrl: '/assets/accomplan.png',
      dateCreated: new Date(),
      lastMod: new Date()
    }

  ];

  constructor() { }

  public get blueSheetForms(): BlueSheetForm[] {
    return [...this._blueSheetForms];
  }

  public get accomplanForms(): AccomplanForm[] {
    return [...this._accomPlanForms];
  }

  public getForm(formId: string, formName: string) : BlueSheetForm | AccomplanForm {
    if (formName === 'bluesheet') {
      return this._blueSheetForms.find(form => form.id === formId);
    } else {
      return this._accomPlanForms.find(form => form.id === formId);
    }
  }
}
