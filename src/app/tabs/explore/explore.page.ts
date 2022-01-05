import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-explore',
  templateUrl: 'explore.page.html',
  styleUrls: ['explore.page.scss']
})
export class ExplorePage implements OnInit, AfterViewInit {
  @ViewChild('map', { static: false }) mapElementRef: ElementRef;

  // Readable Address
  address: string;

  // Location coordinates
  latitude: number;
  longitude: number;
  accuracy: number;

  // Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(
    private modalCtrl: ModalController,
    private renderer: Renderer2,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder

  ) {
    //this.getGeolocation();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getGoogleMaps()
      .then(googleMaps => {

        const mapEl = this.mapElementRef.nativeElement;
        const myLatLng = { lat: -34.397, lng: 150.644 };
        const map = new googleMaps.Map(mapEl, {
          center: myLatLng,
          zoom: 8
        });
        
        googleMaps.event.addListenerOnce(map, 'idle', () => {
          this.renderer.addClass(mapEl, 'visible');
        });

        map.addListener('click', event => {
          const selectedCoords = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          };
          this.modalCtrl.dismiss(selectedCoords);
        });
        // this.geolocation.getCurrentPosition().then((resp) => {
        //   debugger;
        //   this.latitude = resp.coords.latitude;
        //   this.longitude = resp.coords.longitude;
        //   this.accuracy = resp.coords.accuracy;

        //   this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);



        //   if (this.latitude && this.longitude) {
        //     const myLatLng = { lat: this.latitude, lng: this.longitude };

        //     const map = new googleMaps.Map(mapEl, {
        //       center: myLatLng,
        //       zoom: 8
        //     });

        //     const marker = new googleMaps.maps.Marker({
        //       position: myLatLng,
        //       map,
        //       title: this.address,
        //     });

        //     marker.setMap(map);

        //     googleMaps.event.addListenerOnce(map, 'idle', () => {
        //       this.renderer.addClass(mapEl, 'visible');
        //     });

        //     map.addListener('click', event => {
        //       const selectedCoords = {
        //         lat: event.latLng.lat(),
        //         lng: event.latLng.lng()
        //       };
        //       this.modalCtrl.dismiss(selectedCoords);
        //     });

        //   }
        // }).catch((error) => {
        //   alert('Error getting location' + JSON.stringify(error));
        // });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Get current coordinates of device
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.accuracy = resp.coords.accuracy;

      this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);

    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    });
  }

  // geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.address = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        alert('Error getting location' + JSON.stringify(error));
      });
  }

  // Return Comma saperated address
  generateAddress(addressObj) {
    const obj = [];
    let address = '';

    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }

    obj.reverse();
    for (const val in obj) {
      if (obj[val].length) {
        address += obj[val] + ', ';
      }
    }
    return address.slice(0, -2);
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  private getGoogleMaps(): Promise<any> {
    debugger;

    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyBSkijnsnCVWqaNxwjSROoB0cpJM8Nv0TI';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not available.');
        }
      };
    });
  }

}
