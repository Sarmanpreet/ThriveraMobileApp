import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IonSlides, MenuController, ModalController, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { CalendarComponentOptions, DayConfig } from 'ion2-calendar';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import { CommonService } from 'src/app/shared/services/common.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';
import * as EmployeeAction from './store/Employee.actions';
import * as AuthActions from '../../../app/pages/auth/store/auth.actions';
import { Subscription } from 'rxjs';
import { getServerResponse } from '../../../app/pages/auth/store/auth.selectors';
import { AttandanceModalComponentComponent } from 'src/app/components/attandance-modal-component/attandance-modal-component.component';
import { IonRouterOutlet } from '@ionic/angular';
import { BasePageComponent } from 'src/app/components/base-page/base-page.component';
import { getCalenderResponse } from './store/Employee.selectors';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage extends BasePageComponent implements OnInit, OnDestroy {
  dateMulti: string[] = [];//['2021-12-12', '2021-12-11', '2021-12-13'];
  // @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  daysConfig: DayConfig[] = [];
  options: CalendarComponentOptions
  date: string;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'

  userInfo: any;
  slideOpts = {
    initialSlide: 1,
    speed: 2000, autoplay: true
  };
  public subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private router: Router,
    private sessionCall: SessionCheck,
    private toaster: ToastController,
    private commonService: CommonService,
    private menu: MenuController,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {
    super(router, store, sessionCall);
    // const IsdeleteActive = super.IsMenuAccess(D);
  }


  ngOnDestroy(): void {
    debugger;
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    debugger;
    const RoleID = this.sessionCall.getlocalStorage('RoleID');
    const UserId = this.sessionCall.getlocalStorage('userid');

    this.userInfo = JSON.parse(this.sessionCall.getlocalStorage('UserInfo'));

    this.store.dispatch(AuthActions.Menusettings({
      payload: {
        RoleID: RoleID
      }
    }));
    this.store.dispatch(EmployeeAction.GetCalender({
      payload: {
        LoginID: UserId,
        doctype: ''
      }
    }));
    this.store.dispatch(EmployeeAction.GetAttandenceDDL({
      payload: {
        ID: '',
        LoginID: UserId,
        doctype: 'Attendence'
      }
    }));
    const Subscription = this.store.pipe(select(getCalenderResponse))
      .subscribe(
        (getCalenderResponse) => {
          debugger
          if (getCalenderResponse) {
            getCalenderResponse.forEach(element => {
              this.daysConfig.push({
                date: new Date(element.date),
                subTitle: element.Title,
                cssClass: element.cssClass
              });
            });

            this.options = null;
            this.options = {
              from: new Date(2000, 0, 1),
              pickMode: 'multi',
              color: 'danger',
              daysConfig: this.daysConfig
            };
          }
        }
      );

    this.subscription.add(Subscription);

    // this.options = {

    //   from: new Date(2000, 0, 1),
    //   pickMode: 'multi',
    //   color: 'danger',
    //   daysConfig: this.daysConfig
    // };


  }
  doRefresh(event) {
    const RoleID = this.sessionCall.getlocalStorage('RoleID');
    const UserId = this.sessionCall.getlocalStorage('userid');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.store.dispatch(AuthActions.Menusettings({
        payload: {
          RoleID: RoleID
        }
      }));
      this.store.dispatch(EmployeeAction.GetCalender({
        payload: {
          LoginID: UserId,
          doctype: ''
        }
      }));
      this.store.dispatch(EmployeeAction.GetAttandenceDDL({
        payload: {
          ID: '',
          LoginID: UserId,
          doctype: 'Attendence'
        }
      }));
      event.target.complete();
    }, 2000);
  }

  onChange($event) {
    console.log($event);
  }

  async openCommentModal() {
    debugger;
    const paramData = {
      custid: 2

    }
    const modal = await this.modalController.create({
      component: AttandanceModalComponentComponent,
      swipeToClose: true,
      componentProps: paramData,
      // initialBreakpoint: 0.95,
      // breakpoints: [0, 0.5, 1]
      // presentingElement: await this.modalController.getTop()
    });
    return await modal.present();
  }

}

