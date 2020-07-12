import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DspsIntroPage } from './dsps-intro.page';

describe('DspsIntroPage', () => {
  let component: DspsIntroPage;
  let fixture: ComponentFixture<DspsIntroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DspsIntroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DspsIntroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
