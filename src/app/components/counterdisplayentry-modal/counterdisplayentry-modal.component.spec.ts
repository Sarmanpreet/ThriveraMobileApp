import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CounterdisplayentryModalComponent } from './counterdisplayentry-modal.component';

describe('CounterdisplayentryModalComponent', () => {
  let component: CounterdisplayentryModalComponent;
  let fixture: ComponentFixture<CounterdisplayentryModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterdisplayentryModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CounterdisplayentryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
