import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BluesheetComponent } from './bluesheet.component';

describe('BluesheetComponent', () => {
  let component: BluesheetComponent;
  let fixture: ComponentFixture<BluesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluesheetComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BluesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
