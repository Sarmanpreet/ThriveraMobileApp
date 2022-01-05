import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
const { Geolocation } = Plugins;
import * as GMapActions from '../../tabs/gmap/store/gmap.actions';
import { SessionCheck } from 'src/app/shared/session/sessioncheck.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { IAppState } from 'src/app/interfaces/app-states.interface';
import { Store } from '@ngrx/store';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.page.html',
  styleUrls: ['./gmap.page.scss'],
})
export class GMapPage implements OnInit {

  mapData: any;
  address: any = 'Address not found.';
  lat: any;
  lng: any;


  constructor(
    private menu: MenuController,
    private store: Store<IAppState>,
    public commonService: CommonService,
    private sessionCall: SessionCheck,
    private nativeGeocoder: NativeGeocoder,
    private route: ActivatedRoute
  ) {
    // this.route.queryParams.subscribe(params => {
    //   debugger;
    //   if (params && params.mapData) {
    //     this.mapData = JSON.parse(params.mapData);
    //     params = null;
    //   }
    // });
  }


  toggleMenu() {
    this.menu.toggle('menuBar');
    if (this.menu.isEnabled('menuBar')) {
      this.menu.enable(true, 'menuBar');
    } else {
      this.menu.enable(false, 'menuBar');
    }
  }
  ngOnInit() {
    //debugger;
    //this.loadMap();
  }
  loadMap() {
    if (this.mapData) {
      this.lat = this.mapData.Latitude;
      this.lng = this.mapData.Longitude;
      this.address = this.mapData.Location;
    } else {
      this.locate();
    }
  }
 
  ionViewWillEnter(){
    this.locate();
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


  async savelocation() {

    debugger;

    if (this.sessionCall.getlocalStorage('userid') && this.lat && this.lng) {
      const data = {
        EmpCode: this.sessionCall.getlocalStorage('userid'),
        CompCode: 0,
        CompName: '',
        Location: this.address ? this.address : 'Location not found',
        Latitude: this.lat,
        Longitude: this.lng


      };
      this.store.dispatch(
        GMapActions.addCheckIn({
          payload: data
        })
      );
    } else {
      this.commonService.toastAlert(
        'Could not found Location information. Please try again',
        'danger'
      );
    }
  }

}




