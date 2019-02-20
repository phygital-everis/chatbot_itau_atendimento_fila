import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatPage } from "../chat/chat";
//import { HttpEvaProvider } from "../../providers/http-eva/http-eva";
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";
import { WatsonapiProvider } from "../../providers/watsonapi/watsonapi";

@Component({
  selector: 'page-nickname',
  templateUrl: 'nickname.html',
  providers: [WatsonapiProvider, LocalStorageProvider]
})
export class NicknamePage {
  nickname = '';
  pergunta
  token
  msgJson = 
    {
      "session_id": "", 
        "message" : "oi"
    }

  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private watson: WatsonapiProvider,
    private localStorage: LocalStorageProvider
    ) {
    this.joinChat()
  }

  joinChat() {
    this.watson.initChat().subscribe(
      (response) => {        
        this.token = response.session_id
        this.msgJson.session_id = this.token
        this.localStorage.addItem('urlToken', this.token)
        this.firstMessage()
      }
    )
  }

  firstMessage() {    
    this.watson.sendMsg(this.msgJson).subscribe((data) => {
     
      this.pergunta = data.output.generic[0].text
    })
  }

  confirmNickname(){
    this.navCtrl.push(ChatPage, { nickname: this.nickname })
  }
}
