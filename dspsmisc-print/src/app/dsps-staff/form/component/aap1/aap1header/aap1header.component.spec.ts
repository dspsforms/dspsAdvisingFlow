import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Aap1headerComponent } from './aap1header.component';

describe('Aap1headerComponent', () => {
  let component: Aap1headerComponent;
  let fixture: ComponentFixture<Aap1headerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Aap1headerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Aap1headerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
