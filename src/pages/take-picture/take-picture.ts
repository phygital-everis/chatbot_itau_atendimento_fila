import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { VisionProvider } from "../../providers/vision/vision";
import { ShowDocPage } from "../../pages/show-doc/show-doc";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-take-picture',
  templateUrl: 'take-picture.html',
  providers: [VisionProvider]
})
export class TakePicturePage {

  photo:any = ''
  tipoDoc:string
  loading

  constructor(
    private camera: Camera, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private vision:VisionProvider,
    private _sanitizer: DomSanitizer)
    {   
    }
  getPhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      
      this.photo = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
      + imageData);

      this.vision.sendVision(imageData).subscribe((data)=>{
        this.navCtrl.push(ShowDocPage, { data: data, tipo:this.tipoDoc });
      });
    }, (err) => {
      console.log(err);
    });
  }

  choseType(el){
    this.tipoDoc = el._elementRef.nativeElement.value   
  }

}
