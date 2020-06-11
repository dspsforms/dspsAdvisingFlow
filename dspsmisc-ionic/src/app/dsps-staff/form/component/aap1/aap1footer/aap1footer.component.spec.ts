import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Aap1footerComponent } from './aap1footer.component';

describe('Aap1footerComponent', () => {
  let component: Aap1footerComponent;
  let fixture: ComponentFixture<Aap1footerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Aap1footerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Aap1footerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
