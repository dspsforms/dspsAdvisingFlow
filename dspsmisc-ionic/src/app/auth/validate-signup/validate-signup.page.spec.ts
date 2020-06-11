import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValidateSignupPage } from './validate-signup.page';

describe('ValidateSignupPage', () => {
  let component: ValidateSignupPage;
  let fixture: ComponentFixture<ValidateSignupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateSignupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidateSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
