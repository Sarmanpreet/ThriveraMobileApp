import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PendUpcomDemoListPage } from './pend-upcom-demo-list.page';

describe('PendUpcomDemoListPage', () => {
  let component: PendUpcomDemoListPage;
  let fixture: ComponentFixture<PendUpcomDemoListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendUpcomDemoListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PendUpcomDemoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
