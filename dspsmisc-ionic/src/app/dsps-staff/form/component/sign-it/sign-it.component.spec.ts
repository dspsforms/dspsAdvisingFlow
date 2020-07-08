import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignItComponent } from './sign-it.component';

describe('SignItComponent', () => {
  let component: SignItComponent;
  let fixture: ComponentFixture<SignItComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignItComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
