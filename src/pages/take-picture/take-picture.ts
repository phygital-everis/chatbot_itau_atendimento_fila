import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { VisionProvider } from "../../providers/vision/vision";
import { ShowDocPage } from "../../pages/show-doc/show-doc";

@Component({
  selector: 'page-take-picture',
  templateUrl: 'take-picture.html',
  providers: [VisionProvider]
})
export class TakePicturePage {

  photo:any
  tipoDoc:string

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
        
        this.navCtrl.push(ShowDocPage, { data: data, tipo:this.tipoDoc });
      })
    }, (err) => {
      // Handle error
    });
  }

  choseType(el){
    this.tipoDoc = el._elementRef.nativeElement.value    
  }

}
