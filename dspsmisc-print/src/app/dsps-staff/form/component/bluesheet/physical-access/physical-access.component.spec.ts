import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhysicalAccessComponent } from './physical-access.component';

describe('PhysicalAccessComponent', () => {
  let component: PhysicalAccessComponent;
  let fixture: ComponentFixture<PhysicalAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalAccessComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhysicalAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
