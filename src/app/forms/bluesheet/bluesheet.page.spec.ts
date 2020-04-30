import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BluesheetPage } from './bluesheet.page';

describe('BluesheetPage', () => {
  let component: BluesheetPage;
  let fixture: ComponentFixture<BluesheetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BluesheetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BluesheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
