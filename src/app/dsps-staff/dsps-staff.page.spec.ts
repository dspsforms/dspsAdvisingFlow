import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DspsStaffPage } from './dsps-staff.page';

describe('DspsStaffPage', () => {
  let component: DspsStaffPage;
  let fixture: ComponentFixture<DspsStaffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DspsStaffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DspsStaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
