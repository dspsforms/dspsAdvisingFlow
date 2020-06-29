import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSiteCommunicatorComponent } from './sub-site-communicator.component';

describe('SubSiteCommunicatorComponent', () => {
  let component: SubSiteCommunicatorComponent;
  let fixture: ComponentFixture<SubSiteCommunicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubSiteCommunicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSiteCommunicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
