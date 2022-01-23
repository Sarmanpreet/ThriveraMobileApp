import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { resultMemoize, select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import { getAttachmentIdResponse, getAttandenceResponse, getCityDDLListResponse, getItemDDLListResponse, getProductDDLListResponse, getSaleEntryDDLListResponse, getSaveEntryResponse, getSubProductDDLListResponse, saveAttandencelogResponse } from 'src/app/tabs/employee/store/Employee.selectors';
import { CommonService } from 'src/app/shared/services/common.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { GetCityDDL, GetItemDDL, GetProductDDL, GetSalesEntryDDL, GetSubProductDDL, resetAttachementImage, resetAttandence, SaveAttachementImage, SaveAttandence, SaveSalesEntry } from 'src/app/tabs/employee/store/Employee.actions';
import { Geolocation, GeolocationPluginPermissions } from '@capacitor/geolocation';
import { NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { DatePipe } from '@angular/common';
import { format, parseISO } from 'date-fns';
import * as EmployeeAction from '../../tabs/employee/store/Employee.actions';
import { CameraPreview, CameraPreviewPictureOptions } from "@capacitor-community/camera-preview"

import { CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { GetCDEditList, GetCDList, ResetCDEditList, resetCounterDisplay, saveCounterDisplay } from 'src/app/tabs/employee/counterdisplay-list/store/Counterdisplay.actions';
import { getCDEditListtResponse, getSaveCounterDisplayResponse } from 'src/app/tabs/employee/counterdisplay-list/store/Counterdisplay.selectors';
import { environment } from '../../../environments/environment';
import { pairwise, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-counterdisplayentry-modal',
  templateUrl: './counterdisplayentry-modal.component.html',
  styleUrls: ['./counterdisplayentry-modal.component.scss'],
})
export class CounterdisplayentryModalComponent implements OnInit, OnDestroy {
  today = new Date();
  counterDisplayForm: FormGroup;
  StaticcounterDisplayForm: FormGroup;
  DemoData: any = {};
  feedbacks: any = [];
  subscription = new Subscription();
  Image: any;
  ProductTypeDDL: any;
  StateDDL: any;
  PaymentModeDDL: any;
  ItemMasterDDL: any;
  imageElement: any;
  lat: any;
  lng: any;
  nativeGeocoder: any;
  address: string;
  CityDDL: any;
  ProductDDL: any;
  IntialItemMasterDDL: any;
  SubProductDDL: any;
  dateValue: any;
  Brand: any;
  loc: GeolocationPluginPermissions;
  Geopermission: boolean = false;
  CameraPreview: boolean = false;
  CounterData: any;
  ImageData: any;
  URL: string;
  constructor(
    private store: Store<IAppState>,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private toaster: ToastController,
    private commonService: CommonService,
    private navParams: NavParams,
    private sessionCall: SessionCheck) {
    this.startTime();
    this.URL = environment.webURL;
  }


  ngOnInit() {
    debugger;

    this.store.dispatch(ResetCDEditList({ payload: '' }));

    this.store.dispatch(resetCounterDisplay({ payload: '' }));
    this.store.dispatch(resetAttachementImage({ payload: '' }));
    this.initForm();
    this.CounterData = this.navParams.data;
    this.IntialiseDll(this.CounterData.CounterID);

    if (this.CounterData.CounterID != 0) {
      this.EditForm(this.CounterData);


      this.ImageData = this.URL + this.CounterData.AttachmentURL;
      this.Image = this.URL + this.CounterData.AttachmentURL;


    }
    debugger;



    this.locate();
    this.Checkpermission();
    debugger;
    const date = new Date();
    this.dateValue = format(date, 'MMM dd yyyy');
    const Subscription = this.store.pipe(select(getCDEditListtResponse))
      .subscribe(
        (getResponse) => {
          debugger;
          if (getResponse) {
            console.log(getResponse);
            this.Brand = getResponse[1];
            if (this.CounterData.CounterID != 0) {
              this.EditForm(getResponse[0][0]);
            }


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
            const form = this.StaticcounterDisplayForm;
            if (getCalenderResponse[0].MESSAGE == "Added Successfully") {
              this.saveData(form, getCalenderResponse[0].RET_ID);

            }


          }
        }
      );

    this.subscription.add(SubscriptionAttid);
    const SubscriptionAttlog = this.store.pipe(select(getSaveCounterDisplayResponse))
      .subscribe(
        (getResponse) => {
          debugger;
          if (getResponse) {

            if (getResponse[0].Message == 'Inserted Successfully') {


              this.commonService.toastAlert(getResponse[0].Message, 'success');
            }
            else {
              this.commonService.toastAlert(getResponse[0].Message, 'danger');
            }
            this.store.dispatch(resetAttandence({ payload: '' }));
            this.getSalesEntry();
            this.dismissModal();

          }
        }
      );
    this.subscription.add(SubscriptionAttlog);

  }
  saveData(form, imgId) {
    debugger;
    this.store.dispatch(resetAttachementImage({ payload: '' }));
    if (form.valid) {
      const data = {
        CounterID: this.CounterData.CounterID,
        EMPID: this.sessionCall.getlocalStorage('empid'),
        BrandId: form.value.Brand,

        Qty: form.value.Quantity,
        Remarks: '',

        AttachmentID: imgId,
        IsActive: 1,
        Priority: 0,
        createdby: this.sessionCall.getlocalStorage('userid'),

        IPAddress: '192.168.1.1',
        EntrySource: 'App'

      }
      this.store.dispatch(saveCounterDisplay({ payload: data }));
    }
  }
  EditForm(FormData) {
    debugger;



    setTimeout(() => {

      let today = new Date(FormData.Date);
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      this.counterDisplayForm = this.formBuilder.group({

        Quantity: this.formBuilder.control(FormData.Qty ? FormData.Qty : '', [Validators.required]),
        Brand: this.formBuilder.control(FormData.BrandID ? FormData.BrandID : '', [Validators.required]),


      });

    }, 500);
    // setTimeout(() => {
    //   this.MOPForm.patchValue({
    //     Brand: FormData.BrandID,
    //     Product: FormData.ProductID,
    //     SubProduct: FormData.PDTranID
    //   });
    // }, 500);

    //this.feedbackForm = this.formBuilder.group(form);

  }
  formatDate(value: string) {
    this.counterDisplayForm.patchValue({ InvoiceDate: format(parseISO(value), 'MMM dd yyyy') });

    return format(parseISO(value), 'MMM dd yyyy');
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
  IntialiseDll(id) {
    const data = {
      CounterID: id,
      LoginID: this.sessionCall.getlocalStorage('userid'),

    }
    this.store.dispatch(GetCDEditList({ payload: data }));
  }
  initForm() {


    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();


    this.counterDisplayForm = this.formBuilder.group({


      Brand: this.formBuilder.control('', [Validators.required]),
      Quantity: this.formBuilder.control('', [Validators.required]),

    });

    //this.feedbackForm = this.formBuilder.group(form);

  }
  startTime() {
    var intervalVar = setInterval(function () {
      this.today = new Date().toISOString();
    }.bind(this), 500)
  }
  ngOnDestroy() {
    this.counterDisplayForm.reset();
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
    this.ImageData = 'data:image/jpeg;base64,' + this.Image;
    this.CameraPreview = false;
    CameraPreview.stop();

  }
  async takePicture() {
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'rear',
      parent: "cameraPreview",
      className: "cameraPreview",
      paddingBottom: 100
    };
    CameraPreview.start(cameraPreviewOptions);
    this.CameraPreview = true;

    // const image = await Camera.getPhoto({
    //   quality: 30,
    //   source: CameraSource.Camera,
    //   width: 400,
    //   height: 400,

    //   resultType: CameraResultType.Base64
    // });
    // debugger;
    // // image.webPath will contain a path that can be set as an image src.
    // // You can access the original file using image.path, which can be
    // // passed to the Filesystem API to read the raw data of the image,
    // // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    // this.Image = image.base64String
    // // this.Image = image;
    // //var imageUrl = image.webPath;
    // //const databolob = this.dataURItoBlob(image);
    // // Can be set to the src of an image now
    // this.imageElement = "data:image/jpeg;base64," + image.base64String;
  };
  dismissModal() {
    this.counterDisplayForm.reset();
    this.subscription.unsubscribe();
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
  getSalesEntry() {
    const RoleID = this.sessionCall.getlocalStorage('RoleID');
    const UserId = this.sessionCall.getlocalStorage('userid');
    const date = new Date();

    this.store.dispatch(GetCDList({
      payload: {
        LoginID: UserId,
        Month: date.getUTCMonth() + 1,
        Year: date.getFullYear()
      }
    }));



  }
  async saveCDEntry() {
    await this.Checkpermission();
    if (this.Geopermission) {
      const form = this.counterDisplayForm;
      debugger;

      if (form.valid && this.Image != undefined) {
        this.StaticcounterDisplayForm = this.counterDisplayForm;
        if (this.CounterData.CounterID != 0 && this.ImageData == this.URL + this.CounterData.AttachmentURL) {

          this.saveData(this.StaticcounterDisplayForm, this.CounterData.AttachmentID)

        }
        else {
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
            pathFor: 'ssrentry'


          }
          // this.modalController.dismiss({
          //   'dismissed': true
          // });
          this.store.dispatch(SaveAttachementImage({ payload: data }));
        }

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
          this.commonService.toastAlert('Please fill ' + invalid, 'danger');
        }
      }
    }

  }
}
