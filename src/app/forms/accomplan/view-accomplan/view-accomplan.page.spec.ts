import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewAccomplanPage } from './view-accomplan.page';

describe('ViewAccomplanPage', () => {
  let component: ViewAccomplanPage;
  let fixture: ComponentFixture<ViewAccomplanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAccomplanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAccomplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
