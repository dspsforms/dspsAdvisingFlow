import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JointSigViewComponent } from './joint-sig-view.component';

describe('JointSigViewComponent', () => {
  let component: JointSigViewComponent;
  let fixture: ComponentFixture<JointSigViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JointSigViewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JointSigViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
