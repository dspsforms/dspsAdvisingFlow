import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentSignupPage } from './student-signup.page';

describe('StudentSignupPage', () => {
  let component: StudentSignupPage;
  let fixture: ComponentFixture<StudentSignupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSignupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
