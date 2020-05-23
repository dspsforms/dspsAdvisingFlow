import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Aap2headerComponent } from './aap2header.component';

describe('Aap2headerComponent', () => {
  let component: Aap2headerComponent;
  let fixture: ComponentFixture<Aap2headerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Aap2headerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Aap2headerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
