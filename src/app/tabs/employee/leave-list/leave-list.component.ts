import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, MenuController, ModalController, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BasePageComponent } from 'src/app/components/base-page/base-page.component';
import { CompetitionEntryModalComponent } from 'src/app/components/competition-entry-modal/competition-entry-modal.component';
import { LeaveEntryModalComponent } from 'src/app/components/leave-entry-modal/leave-entry-modal.component';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import { ActionButtonType, IDynamicTabColumn, IDynamicTblColumn } from 'src/app/shared/interface/Dynamic-tab';
import { CommonService } from 'src/app/shared/services/common.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';
import { GetCompetitionList, GetLeaveApprovedList, GetLeavePendingList, GetLeaveRejectedList } from '../mop-list/store/Mop.actions';
import { getCompetetitionListResponse, getLeaveApprovedListResponse, getLeavePendingListResponse, getLeaveRejectedListResponse } from '../mop-list/store/Mop.selectors';
import * as EmployeeAction from '../store/Employee.actions';
import { getMOPListResponse } from '../store/Employee.selectors';
@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',

})
export class LeaveListComponent extends BasePageComponent implements OnInit, OnDestroy {
  public tabs: IDynamicTabColumn[] = [];
  subscription = new Subscription();
  formName = "MOPEntry";
  public DataSource: IDynamicTblColumn[] = [];
  public DataSource1: IDynamicTblColumn[] = [];
  public DataSource2: IDynamicTblColumn[] = [];
  public _Colunm: IDynamicTblColumn[] = [];
  BtnOngrid: boolean = false;
  ApprovedtabDeleteBtnOngrid: boolean = false;
  RejectedtabDeleteBtnOngrid: boolean = false;
  PendingtabDeleteBtnOngrid: boolean;
  constructor(private fb: FormBuilder,
    private store: Store<IAppState>,
    private router: Router,
    private sessionCall: SessionCheck,
    private toaster: ToastController,
    private commonService: CommonService,
    private menu: MenuController,
    private modalController: ModalController,
    public alertController: AlertController,
    private routerOutlet: IonRouterOutlet) {

    super(router, store, sessionCall);

    //this.BtnOngrid = super.IsMenuAccess('E');
    debugger;
  }

  ngOnInit() {
    this.getLeaveList();
    const Subscription = this.store.pipe(delay(1000)).pipe(select(getLeavePendingListResponse))
      .subscribe(
        (Response) => {

          if (Response) {
            console.log(Response);
            this.DataSource = Response;
            this.setDataSource(this.DataSource, this.DataSource1, this.DataSource2)

          }
        }
      )
    this.subscription.add(Subscription);
    const SubscriptionApproved = this.store.pipe(delay(1000)).pipe(select(getLeaveApprovedListResponse))
      .subscribe(
        (Response) => {

          if (Response) {
            console.log(Response);
            this.DataSource1 = Response;
            this.setDataSource(this.DataSource, this.DataSource1, this.DataSource2)

          }
        }
      )
    this.subscription.add(SubscriptionApproved);
    const SubscriptionRejected = this.store.pipe(delay(1000)).pipe(select(getLeaveRejectedListResponse))
      .subscribe(
        (Response) => {

          if (Response) {
            console.log(Response);
            this.DataSource2 = Response;
            this.setDataSource(this.DataSource, this.DataSource1, this.DataSource2)

          }
        }
      )
    this.subscription.add(SubscriptionRejected);

    this._Colunm = [{
      title: '',
      name: 'actions',
      tblcolumnWidth: 1.5,
      buttons: [
        {
          type: ActionButtonType.Edit,
          icon: 'create',
          click: this.btnEditClick
        },
      ]
    }, {
      title: 'S.no.',
      name: 'RowNum',
      tblcolumnWidth: 2
    }, {
      title: 'Doc No',
      name: 'DocNo',

    }, {
      title: 'Doc Date',
      name: 'DocDate',

    }, {
      title: 'LeaveType',
      name: 'LeaveType',
    }, {
      title: 'Start Date',
      name: 'StartDate',
    }, {
      title: 'End Date',
      name: 'EndDate',
    }, {
      title: 'Reason',
      name: 'Reason',
    }, {
      title: 'Status',
      name: 'status',
    }
    ]
    this.setDataSource(this.DataSource, this.DataSource1, this.DataSource2)
  }

  btnEditClick = (event, record) => {

    this.OpenModal(record);
  }

  setDataSource(Tab1DS, Tab2DS, Tab3DS) {
    this.tabs = [
      {
        title: 'Pending',
        name: 'Pending',
        datasource: Tab1DS,
        showdeletebtnongrid: this.PendingtabDeleteBtnOngrid
      },
      {
        title: 'Approved',
        name: 'Approved',
        datasource: Tab2DS,
        showdeletebtnongrid: this.ApprovedtabDeleteBtnOngrid
      },
      {
        title: 'Rejected',
        name: 'Rejected',
        datasource: Tab3DS,
        showdeletebtnongrid: this.RejectedtabDeleteBtnOngrid
      }


    ];
  }
  async OpenModal(params: any = undefined) {

    if (params == undefined) {
      params = {
        MOPID: 0,
      }
    }
    const modal = await this.modalController.create({
      component: LeaveEntryModalComponent,
      swipeToClose: true,
      componentProps: params
    });
    return await modal.present();
  }
  ngOnDestroy(): void {
    debugger;
    this.subscription.unsubscribe();
  }
  doRefresh(event) {
    setTimeout(() => {
      this.getLeaveList();
      event.target.complete();
    }, 2000);
  }
  getLeaveList() {
    debugger;
    const RoleID = this.sessionCall.getlocalStorage('RoleID');
    const UserId = this.sessionCall.getlocalStorage('userid');
    const date = new Date();

    this.store.dispatch(GetLeavePendingList({
      payload: {
        LoginID: UserId,
        Approved: 0
      }
    }));

    this.store.dispatch(GetLeaveApprovedList({
      payload: {
        LoginID: UserId,
        Approved: 1
      }
    }));
    this.store.dispatch(GetLeaveRejectedList({
      payload: {
        LoginID: UserId,
        Approved: 2
      }
    }));



  }
}
