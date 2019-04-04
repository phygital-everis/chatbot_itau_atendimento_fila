import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { WatsonapiProvider } from "../../providers/watsonapi/watsonapi";
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [LocalStorageProvider]
})
export class HomePage {

  private rate = 1
  private locale = 'pt-BR'
  public message = {
    "session_id": "",
    "message": "oi"
  }
  public resposta:string
  
  public perguntas = new Array();
  public respostas = new Array();


  constructor(
    public navCtrl: NavController, 
    private localstorage: LocalStorageProvider,
    private tts: TextToSpeech,
    private watson: WatsonapiProvider,

    ) {

     }
  
  ionViewDidLoad(){
    this.localstorage.clearAll()
    this.joinChat()
  }

  joinChat() {
    this.watson.initChat().subscribe(
      (response) => {
        this.message.session_id = response.session_id
        this.localstorage.addItem('urlToken', this.message.session_id)
        this.firstMessage()        
      }
    )
  }

  firstMessage() {
    this.watson.sendMsg(this.message).subscribe((data) => {
      this.resposta = data.output.generic[0].text;
      this.saveResposta();   
      this.message.message = ''   
    });
  }

  sendMessage() {    
    this.savePergunta()
    this.watson.sendMsg(this.message).subscribe((data) => {      
      if (data && data != 'undefined') {
        this.resposta = data.output.generic[0].text
        this.saveResposta();  
        this.message.message = ''   
      }
    })
  }
  textToSpeech(){
    this.tts.speak(this.message.message)
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
  }

  savePergunta() {
    this.perguntas.push(this.message)
    this.localstorage.addItem('perguntas', this.perguntas)
  }

  saveResposta() {
    this.respostas.push(this.resposta)
    this.localstorage.addItem('respostas', this.respostas)
  }
}




