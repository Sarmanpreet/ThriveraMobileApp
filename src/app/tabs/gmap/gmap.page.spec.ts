import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GMapPage } from './gmap.page';

describe('GMapPage', () => {
  let component: GMapPage;
  let fixture: ComponentFixture<GMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
