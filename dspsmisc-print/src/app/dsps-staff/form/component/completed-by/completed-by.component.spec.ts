import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedByComponent } from './completed-by.component';

describe('CompletedByComponent', () => {
  let component: CompletedByComponent;
  let fixture: ComponentFixture<CompletedByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedByComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
