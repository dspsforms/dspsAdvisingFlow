import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstructorPage } from './instructor.page';

describe('InstructorPage', () => {
  let component: InstructorPage;
  let fixture: ComponentFixture<InstructorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
