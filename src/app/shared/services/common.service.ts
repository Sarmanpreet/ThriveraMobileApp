import { AuthGuard } from './auth-guard.service';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs/internal/types';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  expendedlist: any;
  MenuSetting: any = [];

  constructor(private toaster: ToastController, private auth: AuthGuard, private datepipe: DatePipe
    , public loadingCtrl: LoadingController) { }

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
  hideLoading() {
    if (this.loading) {
      this.loading.onDidDismiss();
      ;
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
