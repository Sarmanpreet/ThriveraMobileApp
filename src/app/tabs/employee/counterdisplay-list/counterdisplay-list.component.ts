import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, MenuController, ModalController, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BasePageComponent } from 'src/app/components/base-page/base-page.component';
import { CounterdisplayentryModalComponent } from 'src/app/components/counterdisplayentry-modal/counterdisplayentry-modal.component';
import { MapentryModalComponent } from 'src/app/components/mapentry-modal/mapentry-modal.component';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import { ActionButtonType, IDynamicTabColumn, IDynamicTblColumn } from 'src/app/shared/interface/Dynamic-tab';
import { CommonService } from 'src/app/shared/services/common.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';
import * as CDAction from './store/Counterdisplay.actions';
import { getCDListResponse } from './store/Counterdisplay.selectors';
@Component({
  selector: 'app-counterdisplay-list',
  templateUrl: './counterdisplay-list.component.html',
  styleUrls: ['./counterdisplay-list.component.scss'],
})
export class CounterDisplayListComponent extends BasePageComponent implements OnInit, OnDestroy {
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

    // this.BtnOngrid = super.IsMenuAccess('E');
    debugger;
  }

  ngOnInit() {
    this.getCdList();
    const Subscription = this.store.pipe(delay(1000)).pipe(select(getCDListResponse))
      .subscribe(
        (Response) => {

          if (Response) {
            console.log(Response);
            this.DataSource = Response;

          }
        }
      )
    this.subscription.add(Subscription);
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
      title: 'Date',
      name: 'Date',

    }, {
      title: 'Brand',
      name: 'BrandName',

    }, {
      title: 'Qty',
      name: 'Qty',
    }, {
      title: 'Remarks',
      name: 'Remarks',
    }, {
      title: 'Inserted Date',
      name: 'CreatedDate',
    }, {
      title: 'Inserted By',
      name: 'CreatedBy',
    }, {
      title: 'Updated Date',
      name: 'ModifiedDate',
    }, {
      title: 'Updated By',
      name: 'ModifiedBy',
    }, {
      title: 'IP Address',
      name: 'IPAddress',
    }
    ]

  }

  btnEditClick = (event, record) => {

    this.OpenModal(record);
  }


  async OpenModal(params: any = undefined) {

    if (params == undefined) {
      params = {
        CounterID: 0,
      }
    }
    const modal = await this.modalController.create({
      component: CounterdisplayentryModalComponent,
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
      this.getCdList();
      event.target.complete();
    }, 2000);
  }
  getCdList() {
    debugger;
    const RoleID = this.sessionCall.getlocalStorage('RoleID');
    const UserId = this.sessionCall.getlocalStorage('userid');
    const date = new Date();

    this.store.dispatch(CDAction.GetCDList({
      payload: {
        LoginID: UserId,
        Month: date.getUTCMonth() + 1,
        Year: date.getFullYear()
      }
    }));



  }
}
