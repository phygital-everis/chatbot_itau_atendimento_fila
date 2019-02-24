import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatPage } from "../chat/chat";
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";
import { MediaCapture } from '@ionic-native/media-capture';

@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {

  nickname
  goOn:boolean = false

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private localStorage: LocalStorageProvider,
    private mediaCapture: MediaCapture
  ) {
    this.localStorage.getItems('nickname').then(response=>this.nickname = response)
  }

  ionViewDidLoad() {
  }

  recordVideo(){
    this.goOn = true;
    this.mediaCapture.captureVideo().then((data)=>{
      console.log(JSON.stringify(data))
    })
  }

  confirmVideo(){
    this.navCtrl.push(ChatPage, { pergunta: 'video_ok' });
  }

}
