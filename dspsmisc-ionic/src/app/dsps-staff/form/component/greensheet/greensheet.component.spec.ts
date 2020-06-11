import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GreensheetComponent } from './greensheet.component';

describe('GreensheetComponent', () => {
  let component: GreensheetComponent;
  let fixture: ComponentFixture<GreensheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreensheetComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GreensheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
