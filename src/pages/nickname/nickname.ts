import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatPage } from "../chat/chat";
import { HttpEvaProvider } from "../../providers/http-eva/http-eva";
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";

@Component({
  selector: 'page-nickname',
  templateUrl: 'nickname.html',
  providers: [HttpEvaProvider, LocalStorageProvider]
})
export class NicknamePage {
  nickname = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private eva: HttpEvaProvider,
    private localStorage: LocalStorageProvider
    ) {
  }

  joinChat() {
    this.eva.initChat().subscribe(
      (response) => {
        let token = response.sessionCode
        this.localStorage.addItem('urlToken', token)
        this.navCtrl.push(ChatPage, { nickname: this.nickname })
      }
    )
  }
}
