import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditAccomplanPage } from './edit-accomplan.page';

describe('EditAccomplanPage', () => {
  let component: EditAccomplanPage;
  let fixture: ComponentFixture<EditAccomplanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAccomplanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAccomplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
