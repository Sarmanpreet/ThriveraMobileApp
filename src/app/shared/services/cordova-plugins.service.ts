import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
//import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@awesome-cordova-plugins/background-geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class CordovaPluginsService {
  Image64DataAttn: any;

  constructor(public camera: Camera
    // , private backgroundGeolocation: BackgroundGeolocation
  ) { }

  //Getlocation() {
  //   const config: BackgroundGeolocationConfig = {
  //     desiredAccuracy: 10,
  //     stationaryRadius: 20,
  //     distanceFilter: 30,
  //     interval: 5000,
  //     notificationsEnabled: true,
  //     notificationTitle: 'GPS tracking start',
  //     notificationText: 'Thrivera track you location',
  //     debug: true, //  enable this hear sounds for background-geolocation life-cycle.
  //     stopOnTerminate: false, // enable this to clear background location settings when the app terminates
  //   };

  //   this.backgroundGeolocation.configure(config)
  //     .then(() => {

  //       this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
  //         console.log(location);

  //         // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
  //         // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
  //         // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
  //         this.backgroundGeolocation.finish(); // FOR IOS ONLY
  //       });

  //     });

  // }
  // StartLocation() {
  //   this.backgroundGeolocation.start();
  // }
  // StopLocation() {
  //   this.backgroundGeolocation.stop();
  // }

  clickAttnPicture() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 1

    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):

      this.Image64DataAttn = imageData;
      console.log(this.Image64DataAttn);
      return this.Image64DataAttn;
    }, (err) => {
      // Handle error
    });
  }
}
