import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewBluesheetPage } from './view-bluesheet.page';

describe('ViewBluesheetPage', () => {
  let component: ViewBluesheetPage;
  let fixture: ComponentFixture<ViewBluesheetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBluesheetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewBluesheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
