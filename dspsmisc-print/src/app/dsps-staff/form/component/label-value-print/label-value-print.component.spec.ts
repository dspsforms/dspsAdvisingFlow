import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelValuePrintComponent } from './label-value-print.component';

describe('LabelValuePrintComponent', () => {
  let component: LabelValuePrintComponent;
  let fixture: ComponentFixture<LabelValuePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelValuePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelValuePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
