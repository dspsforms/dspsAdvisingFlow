import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExtendedTimeWithSigComponent } from './extended-time-with-sig.component';

describe('ExtendedTimeWithSigComponent', () => {
  let component: ExtendedTimeWithSigComponent;
  let fixture: ComponentFixture<ExtendedTimeWithSigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedTimeWithSigComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtendedTimeWithSigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
