import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormsForAStudentPage } from './forms-for-a-student.page';

describe('FormsForAStudentPage', () => {
  let component: FormsForAStudentPage;
  let fixture: ComponentFixture<FormsForAStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsForAStudentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormsForAStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
