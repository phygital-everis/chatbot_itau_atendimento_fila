import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
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

  photo:any
  tipoDoc:string

  constructor(
    private camera: Camera, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    private vision:VisionProvider,
    private loadingCtrl: LoadingController,
    private domSanitizer: DomSanitizer )
    { }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      spinner: null,
      duration: 5000,
      dismissOnPageChange: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();
    console.log('Loading dismissed!');
  }

  getPhoto(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

    this.camera.getPicture(options).then((imageData) => {

      console.log(imageData)
      this.photo = this.domSanitizer.bypassSecurityTrustUrl(imageData);

      this.vision.sendVision(imageData).subscribe((data)=>{
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
