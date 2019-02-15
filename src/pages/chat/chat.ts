import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
//import { Observable } from 'rxjs/Observable';
import { HttpEvaProvider } from "../../providers/http-eva/http-eva";
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";
import { TakePicturePage } from "../take-picture/take-picture";
import { SendSmsPage } from "../send-sms/send-sms";
import { Message } from "../../models/message.model";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  providers: [
    HttpEvaProvider, 
    LocalStorageProvider
  ]
})
export class ChatPage {
  @ViewChild(Content) contentArea: Content;
  public nickname : string
  public botName: string = "Itaú"
  public messages = new Array()  
  public msg: string
  private token

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eva: HttpEvaProvider,
    private localStorage: LocalStorageProvider
  ) {
    this.localStorage.getItems('nickname').then(
      (response) => {
        if (response) {
          this.nickname = response
        } else {
          this.nickname = this.navParams.get('nickname');
          this.localStorage.addItem('nickname', this.nickname)
        }
       
      }
    )

    this.localStorage.getItems('urlToken').then(
      (token)=>{        
        if (token) {
          this.token = token
        }
      }
    )
    
    this.localStorage.getItems('messages').then(
      (data)=>{
        if (data) {
          this.messages = data
        }else{
          this.createMessage(this.botName, `Olá ${this.nickname} seja bem vindo`)
        }
      }
    )     
  }

  sendMessage() {
    this.createMessage(this.nickname, this.msg)
    this.eva.sendMsg({ text: this.msg },this.token).subscribe((data)=>{
      this.createMessage(this.botName, data.answers[0].text)
    })
  }

  createMessage(from,text){
    let message: Message = new Message()
    message.text = text
    message.from = from  
    this.messages.push(message)
    this.localStorage.addItem('messages', this.messages)
    setTimeout(() => {
      this.contentArea.scrollToBottom();
    }, 500);
  }

  sendSMS(){
    this.navCtrl.push(SendSmsPage);
    
  }

  takePicture(){
    this.navCtrl.push(TakePicturePage);
  }
}
