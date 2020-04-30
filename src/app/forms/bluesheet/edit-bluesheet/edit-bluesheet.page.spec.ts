import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditBluesheetPage } from './edit-bluesheet.page';

describe('EditBluesheetPage', () => {
  let component: EditBluesheetPage;
  let fixture: ComponentFixture<EditBluesheetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBluesheetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditBluesheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
