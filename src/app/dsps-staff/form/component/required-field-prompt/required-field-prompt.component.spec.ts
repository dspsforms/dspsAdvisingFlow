import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequiredFieldPromptComponent } from './required-field-prompt.component';

describe('RequiredFieldPromptComponent', () => {
  let component: RequiredFieldPromptComponent;
  let fixture: ComponentFixture<RequiredFieldPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequiredFieldPromptComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequiredFieldPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
