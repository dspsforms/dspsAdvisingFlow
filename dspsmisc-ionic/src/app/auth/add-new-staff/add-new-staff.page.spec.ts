import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNewStaffPage } from './add-new-staff.page';

describe('AddNewStaffPage', () => {
  let component: AddNewStaffPage;
  let fixture: ComponentFixture<AddNewStaffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewStaffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewStaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
