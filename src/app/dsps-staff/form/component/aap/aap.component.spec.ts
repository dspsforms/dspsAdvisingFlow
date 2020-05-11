import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AapComponent } from './aap.component';

describe('AapComponent', () => {
  let component: AapComponent;
  let fixture: ComponentFixture<AapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AapComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
