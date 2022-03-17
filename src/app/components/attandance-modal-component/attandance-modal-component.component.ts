import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, Platform, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import { getAttachmentIdResponse, getAttandenceResponse, saveAttandencelogResponse } from 'src/app/tabs/employee/store/Employee.selectors';
import { CommonService } from 'src/app/shared/services/common.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CameraPreview, CameraPreviewPictureOptions } from "@capacitor-community/camera-preview"

import { CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { resetAttandence, SaveAttachementImage, SaveAttandence } from 'src/app/tabs/employee/store/Employee.actions';
import { Geolocation, GeolocationPermissionType, GeolocationPluginPermissions } from '@capacitor/geolocation';
import { NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import * as EmployeeAction from '../../tabs/employee/store/Employee.actions';
import { CordovaPluginsService } from 'src/app/shared/services/cordova-plugins.service';
@Component({
  selector: 'app-attandance-modal-component',
  templateUrl: './attandance-modal-component.component.html',
  styleUrls: ['./attandance-modal-component.component.scss'],
})
export class AttandanceModalComponentComponent implements OnInit, OnDestroy {
  today = new Date();
  attandanceForm: FormGroup;
  DemoData: any = {};
  feedbacks: any = [];
  subscription = new Subscription();
  Image: any = null;
  AttandenceDDL: any;
  imageElement: any;
  lat: any;
  lng: any;
  nativeGeocoder: any;
  address: string;
  loc: GeolocationPluginPermissions;
  Geopermission: boolean;
  UserId: any;
  CameraPreview: boolean = false;
  constructor(
    private store: Store<IAppState>,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private toaster: ToastController,
    private commonService: CommonService,
    private navParams: NavParams,
    private sessionCall: SessionCheck, private platform: Platform
    , public CordovaService: CordovaPluginsService) { this.startTime(); }


  ngOnInit() {
    this.UserId = this.sessionCall.getlocalStorage('userid');
    this.initForm();
    this.locate();
    this.Checkpermission();
    const Subscription = this.store.pipe(select(getAttandenceResponse))
      .subscribe(
        (getAttandenceResponse) => {

          if (getAttandenceResponse) {

            this.AttandenceDDL = getAttandenceResponse


          }
        }
      );

    this.subscription.add(Subscription);
    const SubscriptionAttid = this.store.pipe(select(getAttachmentIdResponse))
      .subscribe(
        (getCalenderResponse) => {
          debugger;
          if (getCalenderResponse) {
            console.log(getCalenderResponse);
            const form = this.attandanceForm;
            if (getCalenderResponse[0].MESSAGE == "Added Successfully") {
              if (form.valid) {
                this.saveAttandence(form, getCalenderResponse[0].RET_ID)
              }
            }


          }
        }
      );

    this.subscription.add(SubscriptionAttid);
    const SubscriptionAttlog = this.store.pipe(select(saveAttandencelogResponse))
      .subscribe(
        (getAttandenceResponse) => {
          debugger;
          if (getAttandenceResponse) {

            if (getAttandenceResponse[0].Message == 'Attendence Marked Successfully') {


              this.commonService.toastAlert(getAttandenceResponse[0].Message, 'success');
            }
            else {
              this.commonService.toastAlert(getAttandenceResponse[0].Message, 'danger');
            }
            this.store.dispatch(resetAttandence({ payload: '' }));

            this.dismissModal();

          }
        }
      );
    this.subscription.add(SubscriptionAttlog);
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

      //   this.nativeGeocoder
      //     .reverseGeocode(this.lat, this.lng, options)
      //     .then(
      //       (result: NativeGeocoderResult[]) =>
      //         (this.address = JSON.stringify(result[0]))
      //     )
      //     .catch((error: any) => console.log(error));
    }
  }
  saveAttandence(form, id) {
    const data = {
      StatusID: form.value.Attandance,
      EMPID: this.sessionCall.getlocalStorage('empid'),
      AttachmentID: id,
      Location: '',
      Latitude: this.lat,
      Longitude: this.lng,
      Error: '',
      Notes: form.value.Notes,
      PunchDistance: '',
      IsActive: '',
      Priority: 0,
      createdby: this.UserId,
      IPAddress: '192.168.1.1',
      EntrySource: 'App'


    }
    this.store.dispatch(SaveAttandence({ payload: data }));
  }
  updateCalender() {
    this.store.dispatch(EmployeeAction.GetCalender({
      payload: {
        LoginID: this.UserId,
        doctype: ''
      }
    }));
    this.store.dispatch(EmployeeAction.GetAttandenceDDL({
      payload: {
        ID: '',
        LoginID: this.UserId,
        doctype: 'Attendence'
      }
    }));
    let today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.store.dispatch(EmployeeAction.GetPunchTime({
      payload: {
        Date: today,
        LoginID: this.UserId
      }
    }));
    this.store.dispatch(EmployeeAction.GetTargetAchieved({
      payload: {
        Month: mm,
        Year: yyyy,
        LoginID: this.UserId,
        Doctype: 'SSR'
      }
    }));
  }
  initForm() {
    // const form = {
    //   StatusID: ['', Validators.required],
    //   Notes: ['']
    // };

    this.attandanceForm = this.formBuilder.group({
      Attandance: this.formBuilder.control('', [
        Validators.required
      ]),
      Notes: ['']
    });

    //this.feedbackForm = this.formBuilder.group(form);

  }
  startTime() {
    var intervalVar = setInterval(function () {
      this.today = new Date().toISOString();
    }.bind(this), 500)
  }
  ngOnDestroy() {

    this.subscription.unsubscribe();


  }
  async flipCamera() {
    CameraPreview.flip();

  }
  async stopCamera() {
    await CameraPreview.stop();
    this.CameraPreview = false;
  }
  async captureImage() {
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 50
    };

    const result = await CameraPreview.capture(cameraPreviewPictureOptions);
    this.Image = result.value;
    this.CameraPreview = false;
    CameraPreview.stop();

  }

  async takePicture() {
    // const image = await Camera.getPhoto({
    //   quality: 30,
    //   source: CameraSource.Camera,
    //   resultType: CameraResultType.Base64,
    //   width: 400,
    //   height: 400, correctOrientation: false
    // }),(err) => {
    //   alert("EROOR IN SAVING PC");
    // });;
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'rear',
      parent: "cameraPreview",
      className: "cameraPreview",
      paddingBottom: 100,

    };
    CameraPreview.start(cameraPreviewOptions);
    this.CameraPreview = true;

    debugger;
    // if (this.platform.is('android')) {
    //   const Image = await this.CordovaService.clickAttnPicture();



    // }
    // else {
    //   try {
    //     Camera.getPhoto({
    //       quality: 30,
    //       source: CameraSource.Camera,
    //       resultType: CameraResultType.Base64,
    //       width: 400,
    //       height: 400, correctOrientation: false
    //     }).then((imageData) => {
    //       this.Image = imageData.base64String;
    //       this.imageElement = "data:image/jpeg;base64," + this.Image;
    //     }, (err) => {
    //       throw err;
    //     });
    //   }
    //   catch (err) {
    //     throw err;
    //   }
    // }
  };
  dismissModal() {
    this.updateCalender();
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  async Checkpermission() {
    const perm = await Geolocation.checkPermissions();
    if (perm.location == "granted") {
      this.Geopermission = true;

    } else {
      this.Geopermission = false;
      this.commonService.toastAlert('Please give permission to locate Device for save ', 'danger');

      this.loc.permissions = ['location'];
      const permission = await Geolocation.requestPermissions(this.loc);

    }
  }

  async saveComment() {
    await this.Checkpermission();
    // this.Image = this.CordovaService.Image64DataAttn;
    // this.imageElement = "data:image/jpeg;base64," + this.Image;
    if (this.lat == undefined && this.lat == undefined) {
      this.commonService.toastAlert('Please check GPS of device', 'danger');

    }
    if (this.Geopermission && this.lat && this.lat) {
      const form = this.attandanceForm;
      debugger;
      if (form.valid && form.value.Attandance == 7) {
        this.saveAttandence(form, 0);
      }
      else if (form.valid && this.Image != undefined) {
        // const formData = new FormData();
        // formData.append('file', this.Image);
        // formData.append('EntityTypeId', '7');

        const data = {
          FileImage: this.Image,
          id: 0,
          filename: ''
          , contenttype: '.jpg'
          , createdby: this.sessionCall.getlocalStorage('userid'),
          tableid: 0,
          TableName: ''
          , IPAddress: '192.168.1.1.',
          Description: '',
          pathFor: 'ssrentry  '

        }
        // this.modalController.dismiss({
        //   'dismissed': true
        // });
        this.store.dispatch(SaveAttachementImage({ payload: data }));

      } else {
        const invalid = [];
        const controls = form.controls;
        for (const name in controls) {
          if (controls[name].invalid) {
            invalid.push(name);
          }
        }
        // this.commonService.toastAlert(invalid, 'danger');

        if (this.Image == undefined) {
          this.commonService.toastAlert('Please upload image ', 'danger');
        }
        else {
          this.commonService.toastAlert('Please fill ' + invalid + 'field', 'danger');
        }
      }
    }
  }
}
