import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuxiliaryAidsComponent } from './auxiliary-aids.component';

describe('AuxiliaryAidsComponent', () => {
  let component: AuxiliaryAidsComponent;
  let fixture: ComponentFixture<AuxiliaryAidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuxiliaryAidsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuxiliaryAidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
