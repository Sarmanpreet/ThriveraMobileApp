import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IonDatetime, ToastController } from '@ionic/angular';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';
import * as AuthActions from '../store/auth.actions';
import { CommonService } from 'src/app/shared/services/common.service';
import { getconfig, getServerResponse } from '../store/auth.selectors';
import { Device } from '@capacitor/device';
import { Browser } from '@capacitor/browser';
import { BackgroundGeolocationPlugin } from "@capacitor-community/background-geolocation";
import { registerPlugin } from '@capacitor/core';
import { GenericCallService } from 'src/app/shared/services/genericCall.service';
import { HttpClient } from '@angular/common/http';
//const BackgroundGeolocation = registerPlugin("BackgroundGeolocation");
//const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");
import { Geolocation, GeolocationAlertOptions, GeolocationConnectOptions, GeolocationNotificationOptions, GeolocationPermissionOptions, GeololocationUpdatesOptions } from '@aldegad/capacitor-geolocation';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy, AfterViewInit {
  login: FormGroup;
  loading = false;
  subscription = new Subscription();
  devid: any;
  weburl: any = '';
  tokenPrivate: any;
  url: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private router: Router,
    private sessionCall: SessionCheck,
    private toaster: ToastController,
    private commonService: CommonService,
    private service: GenericCallService
  ) {
    this.store.dispatch(AuthActions.resetAuthState({
      payload: {
        Checksession: null
      }
    }));
    this.url = service.host + "SetUserLocation/json";

  }
  ngAfterViewInit(): void {



  }
  async startLocationUpdates() {
    await this.startLocation();
  }
  async startLocation() {

    let devid = await Device.getId();
    const token = this.sessionCall.getlocalStorage('token');
    let servicenew: GenericCallService = this.service;
    let postmethod = (paylod) => servicenew.postMethodWithToken('SetUserLocation', token, paylod).subscribe();
    let newurl = environment.apiUrl + "SetUserLocation/json";
    const permissionOptions: GeolocationPermissionOptions = {
      promptAlert: null,
      deniedAlert: null
    }
    const promptAlert: GeolocationAlertOptions = {
      header: "Permission for GPS location",
      message: 'Please give us permission for GPS location',
      okText: 'Ok',
      cancelText: 'Cancel'
    }
    const deniedAlert: GeolocationAlertOptions = {
      header: "Permission for GPS location",
      message: 'Please give us permission for GPS location',
      okText: 'Ok',
      cancelText: 'Cancel'
    }
    permissionOptions.promptAlert = promptAlert;
    permissionOptions.deniedAlert = deniedAlert;
    const { state } = await Geolocation.requestPermission(permissionOptions);

    if (state !== 'granted') return;

    const updatesOptions: GeololocationUpdatesOptions = {
      background: null,
      notification: null,
      connect: null
    }
    const background: boolean = true;
    const notification: GeolocationNotificationOptions = {
      channelID: 'LOCATION_SERVICE_CHANNEL',
      channelName: "Geolocation tracker",
      header: "Geolocation tracking now.",
      message: "Geolocation tracking notification",
      icon: 'drawable/default_dark'
    }
    const connect: GeolocationConnectOptions = {
      token: token,
      url: environment.apiUrl + "SetUserLocation/json",
      body: {
        //   user_id: 'ef34f3f3',
        //   user_position: 'User position is @latitude and @longitude'

        lng: '@latitude',
        lat: '@longitude',
        Devid: devid.uuid,
        isSP: 'true'

      }
    }
    updatesOptions.background = background;
    updatesOptions.notification = notification;
    updatesOptions.connect = connect;
    Geolocation.startLocationUpdates(updatesOptions, ({ latitude, longitude }) => {
      this.commonService.lat = latitude;
      this.commonService.lng = longitude;
      // let paylod = {
      //   lng: longitude,
      //   lat: latitude,
      //   Devid: devid.uuid
      // }
      // postmethod(paylod);
      console.log(latitude, longitude);
    });
  }


  async onLogin() {
    //throw new Error("done");


    debugger;


    this.devid = await Device.getId();

    this.sessionCall.setlocalStorage('session', this.devid.uuid);
    // if (this.login.valid) {
    //   console.log(this.login.value);
    //   this.router.navigateByUrl('/tabs');
    // }
    //this.router.navigate(['/tabs']);
    this.commonService.LoginLoading();


    if (this.login.valid) {
      this.loading = true;
      this.store.dispatch(AuthActions.login({
        payload: {
          UserID: this.login.value.userName,
          Password: this.login.value.password,
          SessionID: this.devid.uuid,
          IPAddress: '192.1.2.3',
        }
      }));
    }
  }

  async isUserLoggedIn() {

    const token = this.sessionCall.getlocalStorage('token');
    const UserId = this.sessionCall.getlocalStorage('userid');

    if (token && UserId > 0) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    debugger;

    this.login = this.fb.group({
      userName: this.fb.control('', [
        Validators.required
      ]),
      password: this.fb.control('', [
        Validators.required
      ])
    });
    const logDeviceInfo = async () => {
      return await Device.getId();
    };
    console.log(logDeviceInfo);

    this.store.dispatch(AuthActions.config({
      payload: {
        ConfigKey: 'WebsiteURL'
      }
    }));


    // if (this.isUserLoggedIn()) {
    //   this.router.navigate(['/employee/employeedashboard']);
    // } else {


    const configSubscription = this.store.pipe(select(getconfig))
      .subscribe(
        (serverResponse) => {
          debugger;
          if (serverResponse) {

            this.weburl = serverResponse.body.ResultSets[0][0].ConfigValue + "Accounts/ForgotPassword";
          }
        });
    this.subscription.add(configSubscription);
    const loginSubscription = this.store.pipe(select(getServerResponse))
      .subscribe(
        (serverResponse) => {

          if (serverResponse) {
            const header = serverResponse.headers;
            const tokenID = header.get('Token');
            if (tokenID !== null) {
              const toArray = tokenID.split(':');
              const userID = serverResponse.body.LoginID;
              const token = toArray[0];
              const tokenexpiry = serverResponse.headers.get('TokenExpiry');
              if (token && userID && tokenexpiry) {
                this.sessionCall.setlocalStorage('UserInfo', JSON.stringify(serverResponse.body));
                this.sessionCall.setlocalStorage('RoleID', serverResponse.body.RoleID);
                this.sessionCall.setlocalStorage('userid', userID);
                this.sessionCall.setlocalStorage('empid', serverResponse.body.EMPID);
                this.sessionCall.setlocalStorage('token', token);
                this.tokenPrivate = token;
                this.startLocationUpdates();

                this.commonService.toastAlert('You are logged in successfully', 'success');
                // this.getmeusettings(serverResponse.body.Roleid);
                //this.router.navigate(['/employee/employeedashboard']);
                this.router.navigate(['/tabs']);
              }
            } else {
              this.loading = false;
              this.commonService.toastAlert('Incorrect username password.', 'danger');
            }
          }
        }
      );

    this.subscription.add(loginSubscription);

    const loginErrorSubscription = this.store.select(a => a.auth.error)
      .subscribe(
        (error) => {
          if (error) {
            //this.commonService.toastAlert('Something went wrong', 'danger');
            this.loading = false;
          }
        }
      );
    this.subscription.add(loginErrorSubscription);
    //}
    if (this.sessionCall.getlocalStorage('token')) {
      this.startLocationUpdates();
      this.router.navigate(['/tabs']);
      // this.router.navigate(['/employee/employeedashboard']);
    }
  }

  async openCapacitorSite() {
    debugger;
    await Browser.open({ url: this.weburl });
  };
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(AuthActions.resetAuthState({
      payload: {
        loading: false,
        serverResponse: null,
        error: null,
        Checksession: null
      }
    }));
  }

}


