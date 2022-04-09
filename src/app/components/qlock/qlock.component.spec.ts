import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QlockComponent } from './qlock.component';

describe('QlockComponent', () => {
  let component: QlockComponent;
  let fixture: ComponentFixture<QlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlockComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
