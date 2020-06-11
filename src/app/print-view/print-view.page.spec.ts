import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrintViewPage } from './print-view.page';

describe('PrintViewPage', () => {
  let component: PrintViewPage;
  let fixture: ComponentFixture<PrintViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrintViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
