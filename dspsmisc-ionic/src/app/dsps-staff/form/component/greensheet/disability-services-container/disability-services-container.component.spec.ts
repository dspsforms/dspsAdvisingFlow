import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DisabilityServicesContainerComponent } from './disability-services-container.component';

describe('DisabilityServicesContainerComponent', () => {
  let component: DisabilityServicesContainerComponent;
  let fixture: ComponentFixture<DisabilityServicesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabilityServicesContainerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DisabilityServicesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
