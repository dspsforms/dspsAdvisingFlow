import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Aap2Component } from './aap2.component';

describe('Aap2Component', () => {
  let component: Aap2Component;
  let fixture: ComponentFixture<Aap2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Aap2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Aap2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
