import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatPage } from "../chat/chat";


@Component({
  selector: 'page-show-doc',
  templateUrl: 'show-doc.html',
})
export class ShowDocPage {

  public doc

  private img

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.img = this.navParams.get('img');
    this.doc = this.img.responses[0].fullTextAnnotation.text;
  }

  ionViewDidLoad() {
    
  }

  confirm(){
    this.navCtrl.push(ChatPage);
  }

}
