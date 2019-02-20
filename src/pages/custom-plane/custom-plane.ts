import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatPage } from "../chat/chat";
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";


@Component({
  selector: 'page-custom-plane',
  templateUrl: 'custom-plane.html',
})
export class CustomPlanePage {
  public nickname: string

  transferencias:number = 0

  saques:number = 0

  cheques:number = 0

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private localStorage: LocalStorageProvider
    ) {
    this.localStorage.getItems('nickname').then(
      (response) => {
        this.nickname = response
      }
    )
  }

  confirmPacote() {
    this.navCtrl.push(ChatPage, { pergunta: 'plano_selecionado' })
  }

}
