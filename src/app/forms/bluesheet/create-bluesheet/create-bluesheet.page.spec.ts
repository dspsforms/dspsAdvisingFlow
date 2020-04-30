import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateBluesheetPage } from './create-bluesheet.page';

describe('CreateBluesheetPage', () => {
  let component: CreateBluesheetPage;
  let fixture: ComponentFixture<CreateBluesheetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBluesheetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBluesheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
