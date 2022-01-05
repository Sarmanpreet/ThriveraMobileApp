import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SavedLocationsPage } from './saved-locations.page';

describe('SavedLocationsPage', () => {
  let component: SavedLocationsPage;
  let fixture: ComponentFixture<SavedLocationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedLocationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SavedLocationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
