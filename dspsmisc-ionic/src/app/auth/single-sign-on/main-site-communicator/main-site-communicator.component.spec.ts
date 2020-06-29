import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSiteCommunicatorComponent } from './main-site-communicator.component';

describe('MainSiteCommunicatorComponent', () => {
  let component: MainSiteCommunicatorComponent;
  let fixture: ComponentFixture<MainSiteCommunicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSiteCommunicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSiteCommunicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
