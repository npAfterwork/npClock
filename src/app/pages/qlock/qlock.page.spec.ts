import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QlockPage } from './qlock.page';

describe('QlockPage', () => {
  let component: QlockPage;
  let fixture: ComponentFixture<QlockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QlockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
