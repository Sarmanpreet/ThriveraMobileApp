import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemoFeedbackModalComponent } from './demo-feedback-modal.component';

describe('DemoFeedbackModalComponent', () => {
  let component: DemoFeedbackModalComponent;
  let fixture: ComponentFixture<DemoFeedbackModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoFeedbackModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemoFeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
