import { Component, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { CommonService } from 'src/app/shared/services/common.service';
import { AgmMap } from '@agm/core';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit {

  address: any = 'Address not found.';
  lat: any;
  lng: any;

  mapData: any;


  constructor(
    private modalController: ModalController,
    private commonService: CommonService,
    private navParams: NavParams,
    private nativeGeocoder: NativeGeocoder,
  ) { }

  ngOnInit() {
    //debugger;
    this.mapData = this.navParams.data;
    if (this.mapData) {
      this.lat = this.mapData.Latitude;
      this.lng = this.mapData.Longitude;
      this.address = this.mapData.Location;
    }else{
      this.locate();
      this.commonService.toastAlert('Displaying your current location', 'success');
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async locate() {
    debugger;
    const coordinates = await Geolocation.getCurrentPosition();
    if (coordinates.coords) {

      this.lat = coordinates.coords.latitude;
      this.lng = coordinates.coords.longitude;

      const options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };

      this.nativeGeocoder.reverseGeocode(this.lat, this.lng, options)
        .then((result: NativeGeocoderResult[]) => {
          this.address = JSON.stringify(result[0]);
        }
        )
        .catch((error: any) => {
          const err = error;
          console.log(error);
        }
        );
    }
  }


}
