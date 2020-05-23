import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProgressObjPart2Component } from './progress-obj-part2.component';

describe('ProgressObjPart2Component', () => {
  let component: ProgressObjPart2Component;
  let fixture: ComponentFixture<ProgressObjPart2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressObjPart2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressObjPart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
