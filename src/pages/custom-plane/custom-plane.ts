import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { ChatPage } from "../chat/chat";
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";
import { ChatScrollPage } from "../chat-scroll/chat-scroll";

@Component({
  selector: 'page-custom-plane',
  templateUrl: 'custom-plane.html',
})
export class CustomPlanePage {
  public nickname: string

  transferencias:number = 0

  saques:number = 0

  total:number = 32

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
    this.navCtrl.push(ChatScrollPage, { pergunta: 'plano_selecionado', passo: 5 })
  }

  alterarValor(propriedade: string, valor: number){
    if((valor == -1 &&  this[propriedade] > 0) || valor == 1){
      this[propriedade] += valor;
    }
  }
}
