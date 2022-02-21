import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { getCalenderResponse, getPunchTimeResponse, getSSRDashBoardResponse, getTargetResponse } from './store/Employee.selectors';
import { parse } from 'path';
import { format, parseISO } from 'date-fns';
import { Chart, registerables } from 'chart.js';
import { stringify } from 'querystring';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit, OnDestroy {
  dateMulti: string[] = [];//['2021-12-12', '2021-12-11', '2021-12-13'];
  // @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  daysConfig: DayConfig[] = [];
  dateValue: any;
  options: CalendarComponentOptions
  date: string;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  todayTime: any;
  userInfo: any;
  slideOpts = {
    initialSlide: 1,
    speed: 2000, autoplay: true
  };
  public subscription = new Subscription();
  Targets: any;
  PunchTime: any;
  todayDiffTime: any;
  doughnutChart: any;
  colorArray: any;
  //@ViewChild('barChart') private barChart: ElementRef;
  @ViewChild('barChart', { static: true }) barChart: ElementRef;
  DashboardSSR: any;

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
    Chart.register(...registerables)
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
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let today = new Date();
    this.userInfo = JSON.parse(this.sessionCall.getlocalStorage('UserInfo'));
    this.dateValue = String(monthNames[today.getUTCMonth()]).padStart(2, '0') + "," + today.getFullYear();
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
    this.store.dispatch(EmployeeAction.GetSSRDashBoard({
      payload: {

        LoginID: UserId

      }
    }));

    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.store.dispatch(EmployeeAction.GetPunchTime({
      payload: {
        Date: today,
        LoginID: UserId
      }
    }));
    this.store.dispatch(EmployeeAction.GetTargetAchieved({
      payload: {
        Month: mm,
        Year: yyyy,
        LoginID: UserId,
        Doctype: 'SSR'
      }
    }));
    const SubscriptionPunchtime = this.store.pipe(select(getPunchTimeResponse))
      .subscribe(
        (Response) => {
          debugger
          if (Response) {
            this.PunchTime = Response[0];
            if (this.PunchTime && this.PunchTime.InStatus == 'Site In' && this.PunchTime.OutStatus !== 'Site Out') {

              this.startTime(new Date(this.PunchTime.DateInTime));

            }
            if (this.PunchTime && this.PunchTime.OutStatus == 'Site Out') {
              this.Time(new Date(this.PunchTime.DateInTime), new Date(this.PunchTime.DateOutTime));
            }
          }
        }
      );
    this.subscription.add(SubscriptionPunchtime);


    const SubscriptionTarget = this.store.pipe(select(getTargetResponse))
      .subscribe(
        (Response) => {
          debugger
          if (Response) {
            this.Targets = Response;
            // this.createBarChart();
          }
        }
      );
    this.subscription.add(SubscriptionTarget);
    const SubscriptionSSRDashboard = this.store.pipe(select(getSSRDashBoardResponse))
      .subscribe(
        (Response) => {
          debugger
          if (Response) {
            this.DashboardSSR = Response[0][0];
            console.log(Response);
            // this.createBarChart();
          }
        }
      );
    this.subscription.add(SubscriptionSSRDashboard);
    const Subscription = this.store.pipe(select(getCalenderResponse))
      .subscribe(
        (getCalenderResponse) => {
          debugger
          if (getCalenderResponse) {
            getCalenderResponse.forEach(element => {
              this.daysConfig.push({
                date: new Date(element.date),
                subTitle: '',
                cssClass: element.Title.replace('.', '').replace(' ', '')
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
  msToTime(ms) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (parseInt(seconds) < 60) return seconds + " Sec";
    else if (parseInt(minutes) < 60) return minutes + " Min";
    else if (parseInt(hours) < 24) return hours + " Hrs";
    else return days + " Days"
  }
  Time(inTime, OutTime) {

    this.todayTime = ((OutTime - inTime) / (1000 * 3600)).toFixed(2);
  }
  startTime(Time) {
    debugger
    let time = new Date().getTime();
    var intervalVar = setInterval(function () {
      this.todayTime = ((Date.now() - Time) / (1000 * 3600)).toFixed(2);;;
    }.bind(this), 500)
  }
  formatDate(value: string) {
    const UserId = this.sessionCall.getlocalStorage('userid');
    //this.newSalesForm.patchValue({ InvoiceDate: format(parseISO(value), 'MMM dd yyyy') });

    this.store.dispatch(EmployeeAction.GetTargetAchieved({
      payload: {
        Month: format(parseISO(value), 'MM'),
        Year: format(parseISO(value), 'yyyy'),
        LoginID: UserId,
        Doctype: 'SSR'
      }
    }));
    return format(parseISO(value), 'MMMM,yyyy');
  }
  createBarChart() {
    let labels: any = [];
    let data1: any = [];
    this.Targets.forEach(element => {

      labels.push(element.ProductType)
      data1.push((element.Achievement * 100 / element.Target).toFixed(2))
      //labels.push(element)
    });
    this.doughnutChart = new Chart(this.barChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: '# of Target',
          data: data1,
          backgroundColor: [
            // 'rgba(54, 162, 235, 0.2)',
            // 'rgba(255, 206, 86, 0.2)',
            // 'rgba(75, 192, 192, 0.2)',
            // 'rgba(255, 159, 64, 0.2)',
            // 'rgba(255, 99, 132, 0.2)',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',


          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',

          ]
        }]
      }

    });
  }
  doRefresh(event) {
    const RoleID = this.sessionCall.getlocalStorage('RoleID');
    const UserId = this.sessionCall.getlocalStorage('userid');
    setTimeout(() => {
      let today = new Date();
      var mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      this.store.dispatch(EmployeeAction.GetPunchTime({
        payload: {
          Date: today,
          LoginID: UserId
        }
      }));
      this.store.dispatch(EmployeeAction.GetTargetAchieved({
        payload: {
          Month: mm,
          Year: yyyy,
          LoginID: UserId,
          Doctype: 'SSR'
        }
      }));
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
      this.store.dispatch(EmployeeAction.GetSSRDashBoard({
        payload: {

          LoginID: UserId

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

