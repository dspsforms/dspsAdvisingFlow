import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpacedIconComponent } from './spaced-icon.component';

describe('SpacedIconComponent', () => {
  let component: SpacedIconComponent;
  let fixture: ComponentFixture<SpacedIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacedIconComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpacedIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
