import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleSignOnPage } from './single-sign-on.page';

describe('SingleSignOnPage', () => {
  let component: SingleSignOnPage;
  let fixture: ComponentFixture<SingleSignOnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSignOnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleSignOnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
