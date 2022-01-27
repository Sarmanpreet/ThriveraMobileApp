import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, MenuController, ModalController, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BasePageComponent } from 'src/app/components/base-page/base-page.component';
import { MapentryModalComponent } from 'src/app/components/mapentry-modal/mapentry-modal.component';
import { RfcEntryModalComponent } from 'src/app/components/rfc-entry-modal/rfc-entry-modal.component';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import { ActionButtonType, IDynamicTabColumn, IDynamicTblColumn } from 'src/app/shared/interface/Dynamic-tab';
import { CommonService } from 'src/app/shared/services/common.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';
import * as EmployeeAction from '../store/Employee.actions';
import { getMOPListResponse } from '../store/Employee.selectors';
import { GetRFCApprovedList, GetRFCPendingList, GetRFCRejectedList } from './store/Rfc.actions';
import { getRFCApprovedListResponse, getRFCPendingListResponse, getRFCRejectedListResponse } from './store/Rfc.selectors';
@Component({
  selector: 'app-rfc-list',
  templateUrl: './rfc-list.component.html',
  styleUrls: ['./rfc-list.component.scss'],
})
export class RFCListComponent extends BasePageComponent implements OnInit, OnDestroy {
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
  PendingtabDeleteBtnOngrid: boolean = false;
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
    this.getRfcList();
    const Subscription = this.store.pipe(delay(1000)).pipe(select(getRFCPendingListResponse))
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
    const SubscriptionApproved = this.store.pipe(delay(1000)).pipe(select(getRFCApprovedListResponse))
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
    const SubscriptionRejected = this.store.pipe(delay(1000)).pipe(select(getRFCRejectedListResponse))
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
          type: ActionButtonType.Delete,
          icon: 'trash',
          click: this.btnDeleteClick
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
      title: 'Attendence Date',
      name: 'AttendenceDate',
    }, {
      title: 'Old Attendence',
      name: 'OldStatus',
    }, {
      title: 'New Attendence',
      name: 'NewStatus',
    }, {
      title: 'Reason',
      name: 'Reason',
    }
    ]
    this.setDataSource(this.DataSource, this.DataSource1, this.DataSource2)
  }

  btnEditClick = (event, record) => {

    this.OpenModal(record);
  }

  setDataSource(Tab1DS, Tab2DS, Tab3DS) {
    debugger
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
      component: RfcEntryModalComponent,
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
      this.getRfcList();
      event.target.complete();
    }, 2000);
  }
  btnDeleteClick = (event, record) => {

    this.presentAlertConfirm(record);

  }

  async presentAlertConfirm(record) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure for <strong>delete</strong> this record!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            // this.commonService.ShowLoader();
            // this.store.dispatch(EmployeeAction.DeleteEntry({
            //   payload: {
            //     ID: record.SaleEntryID,
            //     Doctype: this.formName,
            //     createdby: this.sessionCall.getlocalStorage('userid'),
            //     IPAddress: '192.168.1.1'
            //   }
            // }));
          }
        }
      ]
    });

    await alert.present();
  }

  getRfcList() {
    debugger;
    const RoleID = this.sessionCall.getlocalStorage('RoleID');
    const UserId = this.sessionCall.getlocalStorage('userid');
    const date = new Date();

    this.store.dispatch(GetRFCPendingList({
      payload: {
        LoginID: UserId,
        Month: date.getUTCMonth() + 1,
        Year: date.getFullYear(),
        Approved: 0
      }
    }));
    this.store.dispatch(GetRFCApprovedList({
      payload: {
        LoginID: UserId,
        Month: date.getUTCMonth() + 1,
        Year: date.getFullYear(),
        Approved: 1
      }
    }));
    this.store.dispatch(GetRFCRejectedList({
      payload: {
        LoginID: UserId,
        Month: date.getUTCMonth() + 1,
        Year: date.getFullYear(),
        Approved: 2
      }
    }));


  }
}
