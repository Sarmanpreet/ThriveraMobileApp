import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
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

@Component({
  selector: 'app-new-sales-entry-modal-component',
  templateUrl: './new-sales-entry-modal-component.component.html',
  styleUrls: ['./new-sales-entry-modal-component.component.scss'],
})

export class SalesEntryModalComponentComponent implements OnInit, OnDestroy {
  today = new Date();
  newSalesForm: FormGroup;
  StaticnewSalesForm: FormGroup;
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
  constructor(
    private store: Store<IAppState>,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private toaster: ToastController,
    private commonService: CommonService,
    private navParams: NavParams,
    private sessionCall: SessionCheck,
    public actionSheetController: ActionSheetController) { this.startTime(); }


  ngOnInit() {

    this.IntialiseDll();
    this.initForm();

    //this.locate();
    //this.Checkpermission();
    debugger;
    const date = new Date();
    this.dateValue = format(date, 'MMM dd yyyy');
    const Subscription = this.store.pipe(select(getSaleEntryDDLListResponse))
      .subscribe(
        (getResponse) => {
          debugger;
          if (getResponse) {
            console.log(getResponse);
            this.ProductTypeDDL = getResponse[1];
            this.StateDDL = getResponse[2];
            this.PaymentModeDDL = getResponse[3];
            this.ItemMasterDDL = getResponse[4];
            this.IntialItemMasterDDL = getResponse[4];
            this.Brand = getResponse[0][0].SaleFor;
            this.newSalesForm.patchValue({ Brand: getResponse[0][0].SaleFor });

          }
        }
      );
    this.subscription.add(Subscription);
    const CitySubscription = this.store.pipe(select(getCityDDLListResponse))
      .subscribe(
        (getResponse) => {
          if (getResponse) {
            this.CityDDL = getResponse;
          }
        }
      );

    this.subscription.add(CitySubscription);
    const ProductSubscription = this.store.pipe(select(getProductDDLListResponse))
      .subscribe(
        (getResponse) => {
          if (getResponse) {
            this.ProductDDL = getResponse;
          }
        }
      );

    this.subscription.add(ProductSubscription);
    const SubProductSubscription = this.store.pipe(select(getSubProductDDLListResponse))
      .subscribe(
        (getResponse) => {
          if (getResponse) {
            this.SubProductDDL = getResponse;
          }
        }
      );

    this.subscription.add(SubProductSubscription);
    const ItemSubscription = this.store.pipe(select(getItemDDLListResponse))
      .subscribe(
        (getResponse) => {
          if (getResponse) {
            this.ItemMasterDDL = getResponse;
          }
        }
      );

    this.subscription.add(ItemSubscription);


    const SubscriptionAttid = this.store.pipe(select(getAttachmentIdResponse))
      .subscribe(
        (getCalenderResponse) => {
          debugger;
          if (getCalenderResponse) {
            console.log(getCalenderResponse);
            // const form = this.StaticnewSalesForm;
            this.commonService.dismissLoading();
            if (getCalenderResponse[0].MESSAGE == "Added Successfully") {
              // if (form.valid) {
              this.DispatchEntry(this.StaticnewSalesForm, getCalenderResponse[0].RET_ID)
              //}
            }


          }
        }
      );

    this.subscription.add(SubscriptionAttid);
    const SubscriptionAttlog = this.store.pipe(select(getSaveEntryResponse))
      .subscribe(
        (getResponse) => {
          debugger;
          if (getResponse) {
            this.commonService.dismissLoading();
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
  formatDate(value: string) {
    this.newSalesForm.patchValue({ InvoiceDate: format(parseISO(value), 'MMM dd yyyy') });

    return format(parseISO(value), 'MMM dd yyyy');
  }
  DispatchEntry(form, AttchId) {
    this.commonService.ShwLoader();
    const data = {
      SaleEntryID: 0,
      EMPID: this.sessionCall.getlocalStorage('empid'),
      SaleFor: this.Brand,
      InvoiceDate: form.value.InvoiceDate,
      InvoiceNo: form.value.InvoiceNo,
      ItemID: form.value.Item,
      Qty: form.value.Qty,
      Price: form.value.Price,
      SerialNo: form.value.SerialNo,
      InstallationNo: form.value.InstallationNo,
      PaymentMode: form.value.ModeofPaymnet,
      IsExchange: form.value.Exchange ? 1 : 0,
      Remarks: form.value.Remarks,
      AttachmentID: AttchId,
      IsActive: 1,
      Priority: 0,
      createdby: this.sessionCall.getlocalStorage('userid'),
      Name: form.value.CustomerName,
      Phone: form.value.Phone,
      Email: form.value.Email,
      Doctype: 'local',
      TableID: '',
      TableName: '',
      CountryID: 0,
      StateID: form.value.State,
      CityID: form.value.City,
      Address1: form.value.Address,
      Address2: '',
      Location: form.value.Location,
      Zipcode: '',
      IPAddress: '192.168.1.1',
      EntrySource: 'App'

    }
    this.store.dispatch(SaveSalesEntry({ payload: data }));
    this.store.dispatch(resetAttachementImage({ payload: '' }));
  }
  GetProduct(event) {

    console.log(event.target.value)
    const data = {
      Doctype: "Product",
      Values: event.target.value,
      LoginID: this.sessionCall.getlocalStorage('userid')

    }
    this.store.dispatch(GetProductDDL({ payload: data }));
  }
  GetSubProduct(event) {

    console.log(event.target.value)
    const data = {
      Doctype: "ProductTran",
      Values: event.target.value,
      LoginID: this.sessionCall.getlocalStorage('userid')

    }
    this.store.dispatch(GetSubProductDDL({ payload: data }));
  }
  GetItem(event) {

    console.log(event.target.value)
    const data = {
      Doctype: "Items",
      Values: event.target.value,

      LoginID: this.sessionCall.getlocalStorage('userid')
    }
    this.store.dispatch(GetItemDDL({ payload: data }));
  }
  GetCity(event) {

    console.log(event.target.value)
    const data = {
      Doctype: "City",
      Values: event.target.value,

      LoginID: this.sessionCall.getlocalStorage('userid')

    }
    this.store.dispatch(GetCityDDL({ payload: data }));
  }
  // async locate() {
  //   const coordinates = await Geolocation.getCurrentPosition();
  //   if (coordinates.coords) {
  //     this.lat = coordinates.coords.latitude;
  //     this.lng = coordinates.coords.longitude;

  //     const options: NativeGeocoderOptions = {
  //       useLocale: true,
  //       maxResults: 5
  //     };

  //     // this.nativeGeocoder
  //     //   .reverseGeocode(this.lat, this.lng, options)
  //     //   .then(
  //     //     (result: NativeGeocoderResult[]) =>
  //     //       (this.address = JSON.stringify(result[0]))
  //     //   )
  //     //   .catch((error: any) => console.log(error));
  //   }
  // }
  IntialiseDll() {
    const data = {
      SaleEntryID: 0,
      LoginID: this.sessionCall.getlocalStorage('userid'),

    }
    this.store.dispatch(GetSalesEntryDDL({ payload: data }));
  }
  initForm() {


    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    // const form = {
    //   Date: [mm + '/' + dd + '/' + yyyy, Validators.required],
    //   Brand: ['', Validators.required],
    //   InvoiceNo: ['', Validators.required],

    //   InvoiceDate: ['', Validators.required],

    //   ProductType: [''],
    //   Product: [''],

    //   SubProduct: [''],
    //   Item: ['', Validators.required],

    //   Qty: ['', Validators.required],
    //   SerialNo: ['', Validators.required],

    //   InstallationNo: ['', Validators.required],
    //   ModeofPaymnet: ['', Validators.required],
    //   Exchange: ['', Validators.required],

    //   Remarks: ['', Validators.required],
    //   CustomerName: ['', Validators.required],
    //   Phone: ['', Validators.required],
    //   Email: ['', Validators.required],

    //   State: ['', Validators.required],
    //   City: ['', Validators.required],
    //   Location: ['', Validators.required],
    //   Address: ['', Validators.required],


    // };

    this.newSalesForm = this.formBuilder.group({

      Date: this.formBuilder.control(mm + '/' + dd + '/' + yyyy, [Validators.required]),
      Brand: this.formBuilder.control(this.Brand, [Validators.required]),
      InvoiceNo: this.formBuilder.control('', [Validators.required]),
      InvoiceDate: this.formBuilder.control('', [Validators.required]),
      ProductType: this.formBuilder.control(''),
      Product: this.formBuilder.control(''),
      SubProduct: this.formBuilder.control(''),
      Item: this.formBuilder.control('', [Validators.required]),
      Qty: this.formBuilder.control('', [Validators.required]),
      SerialNo: this.formBuilder.control('', [Validators.required]),
      InstallationNo: this.formBuilder.control('', [Validators.required]),
      ModeofPaymnet: this.formBuilder.control('', [Validators.required]),
      Exchange: this.formBuilder.control('true'),
      Remarks: this.formBuilder.control('', [Validators.required]),
      CustomerName: this.formBuilder.control('', [Validators.required]),
      Phone: this.formBuilder.control('', [Validators.required]),
      Email: this.formBuilder.control('', [Validators.required]),
      Price: this.formBuilder.control('', [Validators.required]),
      State: this.formBuilder.control('', [Validators.required]),
      City: this.formBuilder.control('', [Validators.required]),
      Location: this.formBuilder.control('', [Validators.required]),
      Address: this.formBuilder.control('', [Validators.required])
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

  async PickPicture() {
    const image = await Camera.getPhoto({
      quality: 30,
      source: CameraSource.Photos,
      width: 400,
      height: 400,

      resultType: CameraResultType.Base64
    });
    debugger;
    this.Image = image.base64String
  }
  async takePicture() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.PickPicture();

        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          const cameraPreviewOptions: CameraPreviewOptions = {
            position: 'rear',
            parent: "cameraPreview",
            className: "cameraPreview",
            paddingBottom: 100
          };
          CameraPreview.start(cameraPreviewOptions);
          this.CameraPreview = true;
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();


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
  getSalesEntry() {
    const RoleID = this.sessionCall.getlocalStorage('RoleID');
    const UserId = this.sessionCall.getlocalStorage('userid');
    const date = new Date();

    this.store.dispatch(EmployeeAction.GetSaleEntryList({
      payload: {
        LoginID: UserId,
        Month: date.getUTCMonth() + 1,
        Year: date.getFullYear(),
        Approved: 0
      }
    }));
    this.store.dispatch(EmployeeAction.GetSaleEntryList({
      payload: {
        LoginID: UserId,
        Month: date.getUTCMonth() + 1,
        Year: date.getFullYear(),
        Approved: 1
      }
    }));


  }
  async saveSalesEntry() {
    // await this.Checkpermission();
    // if (this.Geopermission) {
    const form = this.newSalesForm;
    debugger;
    if (form.valid && this.Image != undefined) {
      this.StaticnewSalesForm = this.newSalesForm;
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
      this.commonService.ShwLoader();
      this.store.dispatch(SaveAttachementImage({ payload: data }));

    }
    else if (form.valid) {
      this.DispatchEntry(form, 0);
    }
    else {
      const invalid = [];
      const controls = form.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }
      // this.commonService.toastAlert(invalid, 'danger');
      // if (this.Image == undefined) {


      // }
      // else {
      this.commonService.toastAlert('Please fill ' + invalid, 'danger');
      //}
    }
    //}

  }
}
