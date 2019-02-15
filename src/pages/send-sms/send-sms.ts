import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SendSmsProvider } from "../../providers/send-sms/send-sms";
import { ChatPage } from "../chat/chat";

@Component({
  selector: 'page-send-sms',
  templateUrl: 'send-sms.html',
  providers: [SendSmsProvider, ]
})
export class SendSmsPage {

  code:string
  passCode:string

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private sms: SendSmsProvider
    ) {
  }

  ionViewDidLoad() {
    this.sms.sendMessage('Digite este código para validar o seu telefone: 2234')
  }

  confirmCode(){
    if (this.code == '2234') {
      this.passCode = 'passou'
      this.navCtrl.push(ChatPage);
    }else{
      this.passCode = 'falhou'
    }
  }

}
