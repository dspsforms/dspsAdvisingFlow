import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentPart2Component } from './student-part2.component';

describe('StudentPart2Component', () => {
  let component: StudentPart2Component;
  let fixture: ComponentFixture<StudentPart2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPart2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentPart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
