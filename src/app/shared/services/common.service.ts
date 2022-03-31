import { AuthGuard } from './auth-guard.service';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs/internal/types';
import { Geolocation, GeolocationAlertOptions, GeolocationConnectOptions, GeolocationNotificationOptions, GeolocationPermissionOptions, GeololocationUpdatesOptions } from '@aldegad/capacitor-geolocation';
import { environment } from 'src/environments/environment';
import { Device } from '@capacitor/device';
import { SessionCheck } from '../session/sessioncheck.service';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  expendedlist: any;
  MenuSetting: any = [];
  lat: any;
  lng: any;

  constructor(private toaster: ToastController, private auth: AuthGuard, private datepipe: DatePipe
    , public loadingCtrl: LoadingController,
    private sessionCall: SessionCheck,
    public alertController: AlertController) { }

  //LogOut //
  logOut() {
    this.auth.logOut();

  }

  // Convert to SQL DateFormat //
  convertToDateWithTime(dateValue) {
    const timestamp = dateValue
      ? new Date(dateValue).getTime()
      : '';
    if (timestamp) {
      return this.datepipe.transform(timestamp, 'yyyy-MM-dd HH:mm');
    }
    return null;
  }

  convertToDateWithTimeSecond(dateValue) {
    const timestamp = dateValue
      ? new Date(dateValue).getTime()
      : '';
    if (timestamp) {
      return this.datepipe.transform(timestamp, 'yyyy-MM-dd HH:mm:ss');
    }
    return null;
  }


  // Convert to SQL Date //
  convertToDate(dateValue) {
    const timestamp = dateValue
      ? new Date(dateValue).getTime()
      : '';
    if (timestamp) {
      return this.datepipe.transform(timestamp, 'yyyy-MM-dd');
    }
    return null;
  }
  // To Get Form Control Validation Message //
  getValidationMessages(formControls: any, validationEnumMess: any) {

    const validationMessages = {};

    for (const formControlName in formControls) {
      if (Object.prototype.hasOwnProperty.call(formControls, formControlName)) {
        for (const key in validationEnumMess) {
          if (Object.prototype.hasOwnProperty.call(validationEnumMess, key)) {
            const validationMessage = validationEnumMess[key];
            const controlName = key.split('-')[0];
            const validationType = key.split('-')[1];

            if (controlName === formControlName) {
              if (!validationMessages[controlName]) {
                validationMessages[controlName] = [];
              }
              validationMessages[controlName].push({
                ValidationType: validationType,
                ValidationMessage: validationMessage

              });
            }
          }
        }
      }
    }
    return validationMessages;
  }
  async ShowLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 5000
    });
    await loading.present();


  }

  async LoginLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 3000
    });
    await loading.present();


  }
  async ShowLoader() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 5000
    });
    await this.loading.present();


  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  loading: any;

  loader: any;
  Loadingstart: boolean = false;
  async ShwLoader() {
    this.Loadingstart = true;
    setTimeout(() => {
      this.StartLoader();
    }, 1000);

  }
  async StartLoader() {
    this.loader = await this.loadingCtrl.create({
      message: 'Please wait...',

    });

    await this.loader.present();

  }
  async dismissLoading() {
    debugger;
    if (this.Loadingstart) {

      setTimeout(() => {
        this.loader.dismiss();
        this.Loadingstart = false;
      }, 1000);


    }
  }
  async startLocation() {

    let devid = await Device.getId();
    const token = this.sessionCall.getlocalStorage('token');

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
      this.lat = latitude;
      this.lng = longitude;
      // let paylod = {
      //   lng: longitude,
      //   lat: latitude,
      //   Devid: devid.uuid
      // }
      // postmethod(paylod);
      console.log(latitude, longitude);
    });
  }

  hideLoading() {
    debugger;
    if (this.loading) {
      this.loading.onDidDismiss();


      this.loading.dismiss();
      this.loading = null;
    }
  }

  async toastAlert(txtMsg: any, msgType: any) {
    const toast = await this.toaster.create({
      message: txtMsg,
      duration: 2000,
      color: msgType,
      animated: true
    });
    toast.present();
  }
  async presentAlertMultipleButtons(header: any, subheader: any, message: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subheader,
      message: message,
      backdropDismiss: false,
      buttons: []
    });

    await alert.present();
  }
  async showLoading(text) {
    const loading = await this.loading.create({
      spinner: null,
      duration: 5000,
      message: text,
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
  }
}
