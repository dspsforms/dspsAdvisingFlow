import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovingAroundCampusComponent } from './moving-around-campus.component';

describe('MovingAroundCampusComponent', () => {
  let component: MovingAroundCampusComponent;
  let fixture: ComponentFixture<MovingAroundCampusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovingAroundCampusComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MovingAroundCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
