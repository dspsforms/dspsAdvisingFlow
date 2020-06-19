import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElemWithSigComponent } from './elem-with-sig.component';

describe('ElemWithSigComponent', () => {
  let component: ElemWithSigComponent;
  let fixture: ComponentFixture<ElemWithSigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElemWithSigComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(ElemWithSigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
