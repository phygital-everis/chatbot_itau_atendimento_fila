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
  
  resposta
  token
  pergunta = 
    {
      "session_id": "", 
        "message" : "oi"
    }
  public perguntas = new Array()
  public respostas = new Array()  
  
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
        this.pergunta.session_id = this.token
        this.localStorage.addItem('urlToken', this.token)
        this.firstMessage()
      }
    )
  }

  firstMessage() {    
    this.watson.sendMsg(this.pergunta).subscribe((data) => {
      this.resposta = data.output.generic[0].text
      this.saveResposta()
    })
  }

  confirmNickname(){
    this.savePergunta()
    this.navCtrl.push(ChatPage, { nickname: this.nickname })
  }

  changeChat() {
    //TO DO
      //Adicionar a navegação para a nova tela de chat
  }
 
  savePergunta() {
    this.perguntas.push(this.nickname)
    this.localStorage.addItem('perguntas', this.perguntas)
  }

  saveResposta() {
    this.respostas.push(this.resposta)
    this.localStorage.addItem('respostas', this.respostas)
  }
}
