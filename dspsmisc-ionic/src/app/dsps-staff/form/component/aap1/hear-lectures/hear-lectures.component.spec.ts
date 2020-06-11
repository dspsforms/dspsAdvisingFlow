import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HearLecturesComponent } from './hear-lectures.component';

describe('HearLecturesComponent', () => {
  let component: HearLecturesComponent;
  let fixture: ComponentFixture<HearLecturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearLecturesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HearLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
