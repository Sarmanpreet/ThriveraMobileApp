import { Component } from '@angular/core';
import { MenuController, Platform, ModalController, IonRouterOutlet, AlertController, AlertInput } from '@ionic/angular';
import { interval, Subscription, Observable } from 'rxjs';

import { Howl, Howler } from 'howler';
import { MusicController, PlayerEventOptions, initialPlayerEventOptions } from '../shared/music-controller/music-controller.service';
import { Store, select } from '@ngrx/store';
import { actionMusicSetPlaying } from '../shared/music/music.actions';
import { selectMusic } from '../shared/music/music.selectors';
import { StateMusic, MusicState } from '../shared/music/music.model';
import { initialStateMusic } from '../shared/music/music.reducer';
import { SalesEntryModalComponentComponent } from '../components/new-sales-entry-modal-component/new-sales-entry-modal-component.component';
import { AttandanceModalComponentComponent } from '../components/attandance-modal-component/attandance-modal-component.component';
import { getAttandenceResponse, getSaveReasonResponse } from './employee/store/Employee.selectors';
import { REPLServer } from 'repl';
import { CommonService } from '../shared/services/common.service';
import { GetAttandenceDDL, SaveAttandenceReason } from './employee/store/Employee.actions';
import { SessionCheck } from '../shared/session/sessioncheck.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  canOpenMenu = false;
  audioDuration = 0;
  audioCurrentPosition = 0;
  audioCheckInterval = interval(200);

  showBar: boolean = true;

  player: Howl = null;
  isPlaying = false;
  progress = 0;
  music: PlayerEventOptions = initialPlayerEventOptions;

  audioSubscription: Subscription = new Subscription;
  AttandenceResp: any;
  lineChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  input: AlertInput[] = [];
  constructor(
    private platform: Platform,

    private menu: MenuController,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private musicController: MusicController,

    public alertController: AlertController,
    private store: Store,

    private sessionCall: SessionCheck, private commonService: CommonService,
  ) { }

  scrolled(event) {
    console.log(event);
  }

  toggleMusic() {
    this.musicController.togglePlayer(this.music.isPlaying, (this.music.seek / this.music.duration) * 100);
  }

  closePlayer() {
    this.musicController.abort();
  }

  nextMusic() { }

  prevMusic() { }

  seekMusic() { }

  updateProgressMusic() { }

  tabChanged(event) {
    this.canOpenMenu = event.tab === 'profile';
  }



  async OpenSalesModal() {
    // const paramData = {
    //   custid: 2

    // }
    // const modal = await this.modalController.create({
    //   component: SalesEntryModalComponentComponent,
    //   swipeToClose: true,
    //   componentProps: paramData,
    //   // initialBreakpoint: 0.95,
    //   // breakpoints: [0, 0.5, 1]
    //   // presentingElement: await this.modalController.getTop()
    // });
    // return await modal.present();
  }
  async presentAlertPrompt() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Complete With Reason',
      inputs: this.input,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: ($event) => {
            if (!this.SaveReasons($event))
              return false;

          }
        }
      ]
    });

    await alert.present();
  }
  SaveReasons(event): boolean {
    debugger;
    let flag = true;
    console.log(event);
    if (event.Reason1 != undefined) {
      if (event.Reason1 != "") {
        console.log(event.Reason1);

      } else {
        flag = false;
        this.commonService.toastAlert('Please fill all fields for save ', 'danger');
        return false;
      }
    }
    if (event.Reason2 != undefined) {
      if (event.Reason2 != "") {
        console.log(event.Reason2);
      } else {
        flag = false;
        this.commonService.toastAlert('Please fill all fields for save ', 'danger');
        return false;;
      }
    }
    if (flag) {
      debugger;
      let today1 = new Date();
      let today = new Date(today1.getDate() - 1);
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(this.lineChartLabels[today.getMonth()]).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      if (event.Reason1) {

        const data = {
          Date: dd + '-' + mm + '-' + yyyy,
          Doctype: "SiteOutMissing",
          EMPID: this.sessionCall.getlocalStorage('empid'),
          createdby: this.sessionCall.getlocalStorage('userid'),
          Priority: 0,
          IPAddress: '192.168.1.1',
          Reason: event.Reason1


        }
        this.store.dispatch(SaveAttandenceReason({ payload: data }));
      }
      if (event.Reason2) {
        const data = {
          Date: dd + '-' + mm + '-' + yyyy,
          Doctype: "NoSale",
          EMPID: this.sessionCall.getlocalStorage('empid'),
          createdby: this.sessionCall.getlocalStorage('userid'),
          Priority: 0,
          IPAddress: '192.168.1.1',
          Reason: event.Reason2


        }
        setTimeout(() => {
          this.store.dispatch(SaveAttandenceReason({ payload: data }));
        }, 500);
        setTimeout(() => {
          this.store.dispatch(GetAttandenceDDL({
            payload: {
              ID: '',
              LoginID: this.sessionCall.getlocalStorage('userid'),
              doctype: 'Attendence'
            }
          }));

        }, 1000);

        return true;
      }
    }


  }
  pushinput() {
    this.input.push({
      type: 'textarea',
      value: "We have not found your Sale Today",
      disabled: true,
      cssClass: "textareaDisable"
    },
      {
        name: 'Reason2',
        type: 'text',
        id: 'Reason2-id',
        placeholder: 'Reason'
      })
  }
  async openAttnModal() {
    this.input = [];
    debugger;
    if (this.AttandenceResp) {
      if (this.AttandenceResp.Stop_InPunch) {
        this.input =
          [
            {

              type: 'textarea',
              value: "We have not found your yesterday's out time",
              disabled: true,
              cssClass: "textareaDisable"

            },
            {
              name: 'Reason1',
              type: 'text',
              id: 'Reason1-id',
              placeholder: 'Reason'
            },
            // multiline input.


          ]
        if (this.AttandenceResp.Stop_OutPunch) {
          this.pushinput();
        }
        this.presentAlertPrompt();
      }
      else if (this.AttandenceResp.Stop_OutPunch) {
        this.pushinput();
        this.presentAlertPrompt();
      }
      else if (this.AttandenceResp.CounterDisplay) {
        const alert = await this.alertController.create({
          header: 'Message',
          message: '<br>  Please fill your counter display?',
          buttons: ['ok'],
        });

        await alert.present();
      }
      else {

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
  }
  toggleMenu() {
    this.menu.toggle('menuBar');
    if (this.menu.isEnabled('menuBar')) {
      this.menu.enable(true, 'menuBar');
    } else {
      this.menu.enable(false, 'menuBar');
    }
  }
  openMenu(): void {
    if (this.canOpenMenu) {
      this.menu.open();
    }
  }

  public subscription = new Subscription();
  ngOnInit(): void {
    const SubscriptionDll = this.store.pipe(select(getAttandenceResponse))
      .subscribe(
        (getAttandenceResponse) => {

          if (getAttandenceResponse) {
            this.AttandenceResp = getAttandenceResponse[0][0];
          }
        }
      );
    this.subscription.add(SubscriptionDll);
    const Subscriptionreason = this.store.pipe(select(getSaveReasonResponse))
      .subscribe(
        (getSaveReasonResponse) => {

          if (getSaveReasonResponse) {
            if (getSaveReasonResponse[0].Message = 'Inserted Successfully') {

              this.commonService.toastAlert(getSaveReasonResponse[0].Message, 'success');
            }
            else {
              this.commonService.toastAlert(getSaveReasonResponse[0].Message, 'danger');
            }
          }
        }
      );
    this.subscription.add(Subscriptionreason);

  }
}
