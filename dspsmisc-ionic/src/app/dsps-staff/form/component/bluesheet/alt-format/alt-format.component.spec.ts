import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AltFormatComponent } from './alt-format.component';

describe('AltFormatComponent', () => {
  let component: AltFormatComponent;
  let fixture: ComponentFixture<AltFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltFormatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AltFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
