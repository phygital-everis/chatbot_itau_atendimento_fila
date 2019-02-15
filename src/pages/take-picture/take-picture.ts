import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { VisionProvider } from "../../providers/vision/vision";
import { ShowDocPage } from "../../pages/show-doc/show-doc";
import { Observable } from 'rxjs';

@Component({
  selector: 'page-take-picture',
  templateUrl: 'take-picture.html',
  providers: [VisionProvider]
})
export class TakePicturePage {

  photo:any
  constructor(
    private camera: Camera, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private vision:VisionProvider) 
    {
  }

  getPhoto(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

    this.camera.getPicture(options).then((imageData) => {
    
      this.photo = imageData;
      
      this.vision.sendVision(this.photo).subscribe((data)=>{
        console.log(data)
        this.navCtrl.push(ShowDocPage, { img: data });
      })
    }, (err) => {
      // Handle error
    });
  }

}
