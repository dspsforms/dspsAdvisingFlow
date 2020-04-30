import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccomplanPage } from './accomplan.page';

describe('AccomplanPage', () => {
  let component: AccomplanPage;
  let fixture: ComponentFixture<AccomplanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomplanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccomplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
