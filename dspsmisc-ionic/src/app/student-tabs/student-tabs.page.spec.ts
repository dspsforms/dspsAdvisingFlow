import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentTabsPage } from './student-tabs.page';

describe('StudentTabsPage', () => {
  let component: StudentTabsPage;
  let fixture: ComponentFixture<StudentTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
