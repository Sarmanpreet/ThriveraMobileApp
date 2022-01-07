import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class CordovaPluginsService {
  Image64DataAttn: any;
  constructor(private camera: Camera) { }
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
