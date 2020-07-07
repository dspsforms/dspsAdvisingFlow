import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntermediatePage } from './intermediate.page';

describe('IntermediatePage', () => {
  let component: IntermediatePage;
  let fixture: ComponentFixture<IntermediatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntermediatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntermediatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
