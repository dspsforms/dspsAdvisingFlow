import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProgressObjPart1Component } from './progress-obj-part1.component';

describe('ProgressObjPart1Component', () => {
  let component: ProgressObjPart1Component;
  let fixture: ComponentFixture<ProgressObjPart1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressObjPart1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressObjPart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
