import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, MenuController, ModalController, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BasePageComponent } from 'src/app/components/base-page/base-page.component';
import { SalesEntryModalComponentComponent } from 'src/app/components/new-sales-entry-modal-component/new-sales-entry-modal-component.component';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import { ActionButtonType, IDynamicTabColumn, IDynamicTblColumn } from 'src/app/shared/interface/Dynamic-tab';
import { CommonService } from 'src/app/shared/services/common.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';
import * as EmployeeAction from '../store/Employee.actions';
import { getDeleteEntryResponse, getSaleEntryApprovedListResponse, SaleEntryPendingListResponse } from '../store/Employee.selectors';
@Component({
  selector: 'app-sale-entry-list',
  templateUrl: './sale-entry-list.component.html',
  styleUrls: ['./sale-entry-list.component.scss'],
})
export class SaleEntryListComponent extends BasePageComponent implements OnInit, OnDestroy {


  public tabs: IDynamicTabColumn[] = [];
  subscription = new Subscription();
  formName = "SaleEntry";
  public DataSource: IDynamicTblColumn[] = [];
  public DataSource1: IDynamicTblColumn[] = [];
  public DataSource2: IDynamicTblColumn[] = [];
  public _Colunm: IDynamicTblColumn[] = [];
  PendingtabDeleteBtnOngrid: boolean = false;
  ApprovedtabDeleteBtnOngrid: boolean = false;
  RejectedtabDeleteBtnOngrid: boolean = false;
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

    this.PendingtabDeleteBtnOngrid = super.IsMenuAccess('D');
    debugger;
  }

  ngOnInit() {
    this.getSalesEntry();
    const Subscription = this.store.pipe(delay(1000)).pipe(select(SaleEntryPendingListResponse))
      .subscribe(
        (SaleEntryPendingListResponse) => {

          if (SaleEntryPendingListResponse) {
            debugger;
            this.DataSource = SaleEntryPendingListResponse;
            this.setDataSource(this.DataSource, this.DataSource1, this.DataSource2)
          }
        }
      )
    this.subscription.add(Subscription);
    const Subscription1 = this.store.pipe(delay(1000)).pipe(select(getSaleEntryApprovedListResponse))
      .subscribe(
        (getSaleEntryApprovedListResponse) => {

          if (getSaleEntryApprovedListResponse) {
            debugger;
            this.DataSource1 = getSaleEntryApprovedListResponse;
            this.setDataSource(this.DataSource, this.DataSource1, this.DataSource2)
          }
        }
      )
    this.subscription.add(Subscription1);
    const SubscriptionDeleteEntry = this.store.pipe(delay(1000)).pipe(select(getDeleteEntryResponse))
      .subscribe(
        (getResponse) => {

          if (getResponse) {
            debugger;
            this.commonService.hideLoading();
            if (getResponse[0].MESSAGE == 'Entry deleted Successfully') {
              this.DataSource = [];
              this.setDataSource(this.DataSource, this.DataSource1, this.DataSource2)
              this.getSalesEntry();
              this.commonService.toastAlert(getResponse[0].MESSAGE, 'success');
            }
            else {
              this.commonService.toastAlert(getResponse[0].MESSAGE, 'danger');
            }

          }
        }
      )
    this.subscription.add(SubscriptionDeleteEntry);
    this._Colunm = [{
      title: '',
      name: 'actions',
      tblcolumnWidth: 1.5,
      buttons: [
        {
          type: ActionButtonType.Delete,
          icon: 'trash',
          click: this.btnDeleteClick
        }
      ]
    }, {
      title: 'S.no.',
      name: 'RowNum',
      tblcolumnWidth: 2
    }, {
      title: 'Doc No.',
      name: 'docNo',

    }, {
      title: 'Date',
      name: 'Date',
    }, {
      title: 'City',
      name: 'CityName',
    }, {
      title: 'State',
      name: 'StateName',
    }, {
      title: 'Area',
      name: 'AreaName',
    }, {
      title: 'Dealer Code',
      name: 'DealerCode',
    }, {
      title: 'Dealer Name',
      name: 'DealerName',
    }
    ]
    this.setDataSource(this.DataSource, this.DataSource1, this.DataSource2)
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
            this.commonService.ShowLoader();
            this.store.dispatch(EmployeeAction.DeleteEntry({
              payload: {
                ID: record.SaleEntryID,
                Doctype: this.formName,
                createdby: this.sessionCall.getlocalStorage('userid'),
                IPAddress: '192.168.1.1'
              }
            }));
          }
        }
      ]
    });

    await alert.present();
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
  async OpenModal() {
    const paramData = {
      custid: 2

    }
    const modal = await this.modalController.create({
      component: SalesEntryModalComponentComponent,
      swipeToClose: true,
      componentProps: paramData,
      // initialBreakpoint: 0.95,
      // breakpoints: [0, 0.5, 1]
      // presentingElement: await this.modalController.getTop()
    });
    return await modal.present();
  }
  ngOnDestroy(): void {
    debugger;
    this.subscription.unsubscribe();
  }
  doRefresh(event) {
    setTimeout(() => {

      this.getSalesEntry();
      event.target.complete();
    }, 2000);
  }

  getSalesEntry() {
    const RoleID = this.sessionCall.getlocalStorage('RoleID');
    const UserId = this.sessionCall.getlocalStorage('userid');
    const date = new Date();

    this.store.dispatch(EmployeeAction.GetSaleEntryList({
      payload: {
        LoginID: UserId,
        Month: date.getUTCMonth() + 1,
        Year: date.getFullYear(),
        Approved: 0
      }
    }));
    this.store.dispatch(EmployeeAction.GetSaleEntryList({
      payload: {
        LoginID: UserId,
        Month: date.getUTCMonth() + 1,
        Year: date.getFullYear(),
        Approved: 1
      }
    }));


  }
}
