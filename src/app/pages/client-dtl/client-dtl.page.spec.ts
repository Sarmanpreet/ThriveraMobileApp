import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientDtlPage } from './client-dtl.page';

describe('ClientDtlPage', () => {
  let component: ClientDtlPage;
  let fixture: ComponentFixture<ClientDtlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDtlPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientDtlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
