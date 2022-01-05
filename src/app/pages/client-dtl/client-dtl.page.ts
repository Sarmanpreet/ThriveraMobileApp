import { HttpClient } from '@angular/common/http';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CommentModalComponent } from 'src/app/components/comment-modal/comment-modal.component';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import { CommonService } from 'src/app/shared/services/common.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';
import * as ClientDtlActions from './store/clientDtl.actions';
import { getServerResponse, selectClientCommentsLoaded, selectClientContactList, selectClientDemoStatus, selectMessage } from './store/clientDtl.selectors';
import { Geolocation } from "@capacitor/Geolocation";
import {
  NativeGeocoderOptions,
  NativeGeocoderResult
} from "@ionic-native/native-geocoder/ngx";
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { GenericCallService } from 'src/app/shared/services/genericCall.service';
import { DemoFeedbackModalComponent } from 'src/app/components/demo-feedback-modal/demo-feedback-modal.component';
@Component({
  selector: 'app-client-dtl',
  templateUrl: './client-dtl.page.html',
  styleUrls: ['./client-dtl.page.scss'],
})
export class ClientDtlPage implements OnInit {
  clientdtl: any[];
  client: any;
  clientContacts: any[];
  clientComments: any[];
  activeSegment: FormControl = new FormControl('detail');
  subscription = new Subscription();
  Meeting: string;
  toggleValue: boolean = false;
  strverify: string;
  OTP: string = "";
  MainOtp: any;
  theSate: boolean = false;
  theSates: boolean = false;
  StatusON: boolean = false;
  commentForm = {
    reminderDate: '',
    comment: 'default text'
  };
  address: any;
  lat: any;
  lng: any;
  nativeGeocoder: any;
  DemoStatus: boolean = false;

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private sessionCall: SessionCheck,
    private commonService: CommonService,
    private modalController: ModalController,
    private router: Router,
    private http: HttpClient,
    private toaster: ToastController,
    private location: Location,
    private SendMessageService: GenericCallService,

    //private callNumber: CallNumber,
    private platform: Platform) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
    });
    this.Meeting = 'Start';
    this.route.queryParams.subscribe(params => {
      if (params && params.selectedClientData) {

        this.client = JSON.parse(params.selectedClientData);
        console.log(this.client.ContactNo);
        debugger;

      }

    });
  }
  goBack() {
    this.location.back();
  }
  ngOnInit() {
    this.theSates = false;
    this.locate();

    //     this.getClientDtl();
    this.getClientCommentList();
    this.checkClientDemoStatus();
    const checkActiveDemo = this.store.pipe(select(getServerResponse))
      .subscribe((resp) => {
        if (resp && resp[0].Status) {
          debugger;
          if (resp[0].Status > 0) {
            this.MainOtp = resp[0].ResponseMessage;
            this.DemoStatus = true;
          } else {
            this.DemoStatus = false;
            this.client.Status = "Complete";
          }
        }
      });

    this.subscription.add(checkActiveDemo);

    const sub1 = this.store.pipe(select(selectClientDemoStatus))
      .subscribe((resp) => {
        if (resp) {

          if (!this.DemoStatus && resp) {
            debugger;
            this.DemoStatus = !this.DemoStatus;
            if (this.theSates == true) {
              this.theSate = true;

              this.commonService.toastAlert('Demo Started', 'success');

            }
            else {
              this.theSates = true;
            }

          } else if (this.DemoStatus && resp) {
            this.commonService.toastAlert('Demo Stopped', 'success');
            this.DemoStatus = !this.DemoStatus;
            this.client.Status = "Complete";
          }
        }
      });
    debugger;
    this.subscription.add(sub1);

    console.log(this.clientdtl);
    const sub2 = this.store.pipe(select(selectClientCommentsLoaded))
      .subscribe((resp) => {
        if (resp) {
          this.clientComments = resp;
        }
      });

    this.subscription.add(sub2);


  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkClientDemoStatus() {
    // This function to check wheather this client have active Demo for Today //
    const param = {
      MeetingCustId: this.client.custid,
      DemoId: this.client.Demoid
    }
    this.store.dispatch(ClientDtlActions.onCheckDemo({ payload: param }));
  }

  async locate() {

    const coordinates = await Geolocation.getCurrentPosition();
    if (coordinates.coords) {
      this.lat = coordinates.coords.latitude;
      this.lng = coordinates.coords.longitude;

      const options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };

      // this.nativeGeocoder
      //   .reverseGeocode(this.lat, this.lng, options)
      //   .then(
      //     (result: NativeGeocoderResult[]) =>
      //       (this.address = JSON.stringify(result[0]))
      //   )
      //   .catch((error: any) => console.log(error));
    }
  }
  onDemoClick() {
    debugger;
    //this.commonService.toastAlert('Demo Started', 'success');
    if (!this.DemoStatus) {
      this.locate()
      this.MainOtp = Math.floor(100000 + Math.random() * 900000);

      setTimeout(() => {

        const startParam = {
          MeetingCustId: this.client.custid,
          MeetingBy: this.sessionCall.getlocalStorage('userid'),
          MeetingLng: this.lng,
          MeetingLat: this.lat,
          MeetingOTP: this.MainOtp,
          CreatedBy: this.sessionCall.getlocalStorage('userid'),
          MeetingStartOn: this.commonService.convertToDateWithTime(new Date()),
          DemoId: this.client.Demoid
        }

        this.store.dispatch(ClientDtlActions.onStartDemo({ payload: startParam }));

      }, 3000);

    } else {
      this.openCommentModal();
      // if (this.MainOtp == this.OTP) {

      //   const stopParam = {
      //     MeetingCustId:this.client.custid,
      //     MeetingEndOn: this.commonService.convertToDateWithTime(new Date()),
      //     Demoid:this.client.Demoid
      //   }
      //   this.store.dispatch(ClientDtlActions.onStopDemo({ payload: stopParam }));
      //   this.commonService.toastAlert('OTP Verified Successfully', 'success');

      // }
      // else {
      //   this.commonService.toastAlert('OTP Incorrect', 'succdangeress');


      // }

    }
  }


  // stateChange(event) {
  //   if (this.toggleValue == false) {
  //     this.MainOtp = Math.floor(100000 + Math.random() * 900000);
  //     this.strverify = "SatcapIndia Meeting Verfication: OTP " + this.MainOtp;
  //     alert(this.strverify);
  //     //this.http.get("http://byebyesms.com/app/smsapi/index.php?key=25E44CB1845D2D&campaign=9555&routeid=7&type=text&contacts=7009400781&senderid=SATCAP&msg="+this.strverify).subscribe();
  //     this.commonService.toastAlert('OTP Send Successfully', 'success');
  //     this.toggleValue = true;
  //     this.theSate = true;
  //   }
  //   else {
  //     if (this.MainOtp == this.OTP) {
  //       this.commonService.toastAlert('OTP Verified Successfully', 'success');
  //       this.toggleValue = false;
  //       this.theSate = false;
  //     }
  //     else {
  //       this.commonService.toastAlert('OTP Incorrect', 'succdangeress');
  //       this.toggleValue = true;
  //       this.theSate = true;
  //       event.target.checked = true;
  //     }
  //   }

  // }

  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      // this.getClientCommentList();
      event.target.complete();
    }, 2000);
  }

  Call() {

  }
  getClientDtl() {
    debugger;
    if (this.client) {
      this.store.dispatch(ClientDtlActions.loadClientDtl({
        payload: {
          id: this.client.custid,
        }
      }));
    } else {
      this.commonService.toastAlert('Could not found client contacts. Please re-login', 'danger');
    }
  }
  // getClientContactList() {
  //   if (this.client) {
  //     this.store.dispatch(ClientDtlActions.loadClientContacts({
  //       payload: {
  //         CompCode: this.client.COMP_CODE,
  //       }
  //     }));
  //   } else {
  //     this.commonService.toastAlert('Could not found client contacts. Please re-login', 'danger');
  //   }
  // }
  getClientCommentList() {
    if (this.client) {
      this.store.dispatch(ClientDtlActions.loadClientComments({
        payload: {
          custid: this.client.custid,
        }
      }));
    } else {
      this.commonService.toastAlert('Could not found client contacts. Please re-login', 'danger');
    }
  }
  async openCommentModal() {
    debugger;
    const paramData = {
      custid: this.client.custid,
      demoid: this.client.Demoid,
      OTP: this.MainOtp
    }
    const modal = await this.modalController.create({
      component: DemoFeedbackModalComponent,
      swipeToClose: true,
      componentProps: paramData
      // presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }
  // async openCommentModal(event: Event) {

  //   const modal = await this.modalController.create({
  //     component: DemoFeedbackModalComponent,
  //     swipeToClose: true,
  //     componentProps: this.client
  //     // presentingElement: this.routerOutlet.nativeEl
  //   });
  //   return await modal.present();
  // }

}
