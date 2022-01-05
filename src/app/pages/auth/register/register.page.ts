import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import { Pattern } from 'src/app/shared/enums/patterns.enums';
import { RegisterFormValidationEnum } from 'src/app/shared/enums/validation-msgs.enums';
import { CommonService } from 'src/app/shared/services/common.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';
import { register } from '../store/auth.actions';
import { getServerResponse } from '../store/auth.selectors';
import { Geolocation } from "@capacitor/Geolocation";
import {
  NativeGeocoderOptions,
  NativeGeocoderResult
} from "@ionic-native/native-geocoder/ngx";
//import * as GMapActions from "../../../tabs/gmap/store/gmap.actions";
import { debugOutputAstAsTypeScript } from '@angular/compiler';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  validationMessages: any;
  address: any;
  lat: any;
  lng: any;
  nativeGeocoder: any;
  subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>,
    private commonService: CommonService,
    private session: SessionCheck
  ) { }

  onRegister(form: FormGroup) {
    this.locate()
    this.commonService.ShowLoading();
    this.commonService.ShowLoader();
    setTimeout(() => {
      form.controls['Lat'].setValue(this.lat);
      form.controls['Long'].setValue(this.lng);

      debugger;
      if (form.valid) {
        console.log(this.registerForm.value);

        this.store.dispatch(register({ payload: form.value }));
      }
    }, 4000);

  }

  ngOnInit() {

    this.initForm();

    const sub1 = this.store.pipe(select(getServerResponse))
      .subscribe((resp) => {
        if (resp && resp.Status) {
          this.commonService.toastAlert(resp.ResponseMessage, 'success');
          this.commonService.hideLoading();
        } else if (resp !== null && resp === false) {
          this.commonService.toastAlert(resp.ResponseMessage, 'danger');
        }
      });

    this.subscription.add(sub1);

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
  initForm() {
    const form = {
      FirstName: this.fb.control('', [
        Validators.required,
      ]),
      LastName: this.fb.control('', [
        Validators.required,
      ]),

      Gender: this.fb.control('', [
        Validators.required,
      ]),
      DOB: this.fb.control('', [
        Validators.required,
      ]),
      AddrLine1: this.fb.control('', [
        Validators.required,
      ]),
      AddrLine2: this.fb.control(''),
      AdharNo: this.fb.control(''),
      City: this.fb.control('', [
        Validators.required,
      ]),
      State: this.fb.control('', [
        Validators.required,
      ]),
      Country: this.fb.control('INDIA', [
        Validators.required,
      ]),
      PinCode: this.fb.control('', [
        Validators.required,
      ]),
      EmailID: this.fb.control('', [
        Validators.required,
        Validators.pattern(Pattern.EmailAddress),
      ]),
      CompName: this.fb.control('', [
        Validators.required,
      ]),
      //   GSTNo: this.fb.control('', [
      //   Validators.required,
      //   Validators.minLength(15),
      //   Validators.maxLength(15)
      // ]),        
      PAN: this.fb.control(''),
      ContactNo: this.fb.control('', [
        Validators.required,
      ]),
      UserName: this.fb.control('', [
        Validators.required,
      ]),
      Pwd: this.fb.control('', [
        Validators.required,
      ]),
      password_confirm: this.fb.control('', [
        Validators.required,
      ]),
      GSTNo: this.fb.control(''),
      CustTypeId: 3,
      JoinDate: this.commonService.convertToDate(new Date()),
      IsActive: [1],
      Lat: this.lat,
      Long: this.lng,

      CreatedBy: this.session.getlocalStorage('userid') || 0
    }
    this.registerForm = this.fb.group(form);
    this.validationMessages = this.commonService.getValidationMessages(form, RegisterFormValidationEnum);

  }
  passwordConfirmMatchValidator(g: FormGroup) {
    const password = g.get('password');
    const password_confirm = g.get('password_confirm');

    if (password_confirm.hasError('required') || password_confirm.hasError('minlength')) return;

    if (password.value !== password_confirm.value) {
      password_confirm.setErrors({
        mismatch: true
      });
    } else {
      password_confirm.setErrors(null);
    }
  }
}
