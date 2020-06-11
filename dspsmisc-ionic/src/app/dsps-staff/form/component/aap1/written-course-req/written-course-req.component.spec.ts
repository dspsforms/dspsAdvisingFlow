import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WrittenCourseReqComponent } from './written-course-req.component';

describe('WrittenCourseReqComponent', () => {
  let component: WrittenCourseReqComponent;
  let fixture: ComponentFixture<WrittenCourseReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrittenCourseReqComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WrittenCourseReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
