import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxGridComponent } from './checkbox-grid.component';

describe('CheckboxGridComponent', () => {
  let component: CheckboxGridComponent;
  let fixture: ComponentFixture<CheckboxGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
