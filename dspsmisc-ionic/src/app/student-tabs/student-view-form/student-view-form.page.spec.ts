import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentViewFormPage } from './student-view-form.page';

describe('StudentViewFormPage', () => {
  let component: StudentViewFormPage;
  let fixture: ComponentFixture<StudentViewFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentViewFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentViewFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
