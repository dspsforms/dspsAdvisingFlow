import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SigViewComponent } from './sig-view.component';

describe('StudentSigViewComponent', () => {
  let component: SigViewComponent;
  let fixture: ComponentFixture<SigViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigViewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SigViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
