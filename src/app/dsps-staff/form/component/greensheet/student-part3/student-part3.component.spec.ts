import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentPart3Component } from './student-part3.component';

describe('StudentPart3Component', () => {
  let component: StudentPart3Component;
  let fixture: ComponentFixture<StudentPart3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPart3Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentPart3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
