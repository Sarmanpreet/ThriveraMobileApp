
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import { CommonService } from 'src/app/shared/services/common.service';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { GetSubProductDDL } from 'src/app/tabs/employee/store/Employee.actions';
import { Geolocation, GeolocationPluginPermissions } from '@capacitor/geolocation';
import { NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { DatePipe } from '@angular/common';
import { format, parseISO } from 'date-fns';
import * as EmployeeAction from '../../tabs/employee/store/Employee.actions';
import { CameraPreview, CameraPreviewPictureOptions } from "@capacitor-community/camera-preview"

import { CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { getMOPProductListResponse, getSaveMopResponse } from 'src/app/tabs/employee/mop-list/store/Mop.selectors';
import { GetMOPProductList, resetMOP, ResetMOPProductList, saveMOPEntry } from 'src/app/tabs/employee/mop-list/store/Mop.actions';
import { getSubProductDDLListResponse } from 'src/app/tabs/employee/store/Employee.selectors';
import { GetNewttandenceStatus, GetOldAttandenceStatus, GetRFCApprovedList, GetRFCPendingList, GetRFCRejectedList, saveRFCEntry } from 'src/app/tabs/employee/rfc-list/store/Rfc.actions';
import { getnewAttnStatusResponse, getOldAttnStatusResponse, getSaveRFCResponse } from 'src/app/tabs/employee/rfc-list/store/Rfc.selectors';

@Component({
  selector: 'app-rfc-entry-modal',
  templateUrl: './rfc-entry-modal.component.html',
  styleUrls: ['./rfc-entry-modal.component.scss'],
})
export class RfcEntryModalComponent implements OnInit, OnDestroy {
  today = new Date();
  MOPForm: FormGroup;
  MopData: any = {};
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
  OldAttn: any;
  NewAttn: any;
  constructor(
    private store: Store<IAppState>,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private toaster: ToastController,
    private commonService: CommonService,
    private navParams: NavParams,
    private sessionCall: SessionCheck) { this.startTime(); }


  ngOnInit() {
    this.store.dispatch(ResetMOPProductList({ payload: '' }));

    this.initForm();
    this.MopData = this.navParams.data;
    this.IntialiseDll(this.MopData.MOPID);

    // if (this.MopData.MOPID != 0) {
    //   this.EditForm(this.MopData);
    // }






    //this.locate();
    // this.Checkpermission();
    debugger;
    const date = new Date();
    this.dateValue = format(date, 'MMM dd yyyy');
    // const Subscription = this.store.pipe(select(getMOPProductListResponse))
    //   .subscribe(
    //     (getResponse) => {

    //       if (getResponse) {


    //         this.ProductDDL = getResponse[2];
    //         this.Brand = getResponse[1];
    //         if (this.MopData.MOPID != 0) {
    //           this.EditForm(getResponse[0][0]);
    //         }


    //       }
    //     }
    //   );
    // this.subscription.add(Subscription);

    const SubProductSubscription = this.store.pipe(select(getOldAttnStatusResponse))
      .subscribe(
        (getResponse) => {
          if (getResponse) {
            this.OldAttn = getResponse;
          }
        }
      );

    this.subscription.add(SubProductSubscription);
    const SubNewSubscription = this.store.pipe(select(getnewAttnStatusResponse))
      .subscribe(
        (getResponse) => {
          if (getResponse) {
            this.NewAttn = getResponse;
          }
        }
      );

    this.subscription.add(SubNewSubscription);


    const SubscriptionAttlog = this.store.pipe(select(getSaveRFCResponse))
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
            this.store.dispatch(resetMOP({ payload: '' }));
            this.getRFCEntry();
            this.dismissModal();

          }
        }
      );
    this.subscription.add(SubscriptionAttlog);

  }
  formatDate(value: string) {
    this.MOPForm.patchValue({ AttendenceDate: format(parseISO(value), 'MMM dd yyyy') });

    const data = {
      Values: value,
      Doctype: 'FinalAttendence',
      LoginID: this.sessionCall.getlocalStorage('userid')

    }
    this.store.dispatch(GetOldAttandenceStatus({ payload: data }));

    return format(parseISO(value), 'MMM dd yyyy');

  }

  GetSubProduct(event) {

    // this.getSubProduct(event.target.value)

  }

  IntialiseDll(ID) {
    const data = {
      Values: '',
      Doctype: 'FinalAttendenceStatusList',
      LoginID: this.sessionCall.getlocalStorage('userid')

    }
    this.store.dispatch(GetNewttandenceStatus({ payload: data }))
  }
  initForm() {


    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();



    this.MOPForm = this.formBuilder.group({

      Date: this.formBuilder.control(dd + '-' + mm + '-' + yyyy, [Validators.required]),
      OldAttendence: this.formBuilder.control('', [Validators.required]),
      NewAttendence: this.formBuilder.control('', [Validators.required]),
      Reason: this.formBuilder.control('', [Validators.required]),
      AttendenceDate: this.formBuilder.control('', [Validators.required])

    });

    //this.feedbackForm = this.formBuilder.group(form);

  }
  EditForm(FormData) {
    debugger;
    //this.getSubProduct(FormData.ProductID)



    setTimeout(() => {

      let today = new Date(FormData.Date);
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      this.MOPForm = this.formBuilder.group({

        Date: this.formBuilder.control(dd + '-' + mm + '-' + yyyy, [Validators.required]),
        Product: this.formBuilder.control(FormData.ProductID ? FormData.ProductID : '', [Validators.required]),
        Brand: this.formBuilder.control(FormData.BrandID ? FormData.BrandID : '', [Validators.required]),

        SubProduct: this.formBuilder.control(FormData.PDTranID ? FormData.PDTranID : '', [Validators.required]),
        ModelNumber: this.formBuilder.control(FormData.ModelNo ? FormData.ModelNo : '', [Validators.required]),
        Price: this.formBuilder.control(FormData.Price ? FormData.Price : '', [Validators.required]),

        Remarks: this.formBuilder.control(FormData.Remarks ? FormData.Remarks : '', [Validators.required]),

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
  getRFCEntry() {
    const RoleID = this.sessionCall.getlocalStorage('RoleID');
    const UserId = this.sessionCall.getlocalStorage('userid');
    const date = new Date();

    this.store.dispatch(GetRFCPendingList({
      payload: {
        LoginID: UserId,
        Month: date.getUTCMonth() + 1,
        Year: date.getFullYear(),
        Approved: 0
      }
    }));
    this.store.dispatch(GetRFCApprovedList({
      payload: {
        LoginID: UserId,
        Month: date.getUTCMonth() + 1,
        Year: date.getFullYear(),
        Approved: 1
      }
    }));
    this.store.dispatch(GetRFCRejectedList({
      payload: {
        LoginID: UserId,
        Month: date.getUTCMonth() + 1,
        Year: date.getFullYear(),
        Approved: 2
      }
    }));


  }
  async saveRFCEntry() {
    // await this.Checkpermission();
    // if (this.Geopermission) {
    const form = this.MOPForm;
    debugger;
    if (form.valid) {
      // const formData = new FormData();
      // formData.append('file', this.Image);
      // formData.append('EntityTypeId', '7');

      const data = {
        EMPID: this.sessionCall.getlocalStorage('empid'),
        AttendenceDate: form.value.AttendenceDate,
        Old_StatusID: form.value.OldAttendence,
        New_StatusID: form.value.NewAttendence,
        Reason: form.value.Reason,

        createdby: this.sessionCall.getlocalStorage('userid'),
        EntrySource: "App",
        IPAddress: '192.168.1.1',



      }
      this.store.dispatch(saveRFCEntry({ payload: data }));

    } else {
      const invalid = [];
      const controls = form.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }


      this.commonService.toastAlert('Please fill ' + invalid, 'danger');

    }
    //}

  }
}


