import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExamsWithAccomodationsComponent } from './exams-with-accomodations.component';

describe('ExamsWithAccomodationsComponent', () => {
  let component: ExamsWithAccomodationsComponent;
  let fixture: ComponentFixture<ExamsWithAccomodationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamsWithAccomodationsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExamsWithAccomodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
