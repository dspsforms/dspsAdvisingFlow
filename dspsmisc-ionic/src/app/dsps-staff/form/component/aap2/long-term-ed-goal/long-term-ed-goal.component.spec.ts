import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LongTermEdGoalComponent } from './long-term-ed-goal.component';

describe('LongTermEdGoalComponent', () => {
  let component: LongTermEdGoalComponent;
  let fixture: ComponentFixture<LongTermEdGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongTermEdGoalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LongTermEdGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
