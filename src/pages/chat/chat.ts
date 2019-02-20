import { Component } from '@angular/core';
import { NavController, NavParams, ToastController  } from 'ionic-angular';
import { WatsonapiProvider } from "../../providers/watsonapi/watsonapi";
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";
import { TakePicturePage } from "../take-picture/take-picture";
import { PlanosPage } from "../planos/planos";
import { AddressPage } from "../address/address";
import { HomePage } from "../home/home";
import { SendSmsPage } from "../send-sms/send-sms";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  providers: [
    WatsonapiProvider, 
    LocalStorageProvider
  ]
})
export class ChatPage {
  public nickname : string
  public botName: string = "Itaú"
  public perguntas = new Array()  
  public respostas = new Array()  
  public msg: string
  private token
  public pergunta
  public resposta
  public next:boolean = false
  isPass:boolean = false
  isCPF:boolean = false
  isFone:boolean = false
  isReal:boolean = false
  dados = {
    "cpf":"",
    "celular":"",
    "plano":"",
    "endereco":""
  }
  msgJson =
    {
      "session_id": "",
      "message": ""
    }
  public passos = [
    'Definir uma senha',
    'Um número para contato',
    'Confirmar número de contato',
    'Informar renda',
    'Escolher plano',
    'Enviar documento',
    'Enviar endereço',
    'Retornar para Home'
  ]
  public passoAtual = 0

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private whatson: WatsonapiProvider,
    private localStorage: LocalStorageProvider,
    public toastCtrl: ToastController
  ) {
    
    this.localStorage.getItems('nickname').then(
      (response) => {
        if (response) {
          this.nickname = response
          this.getToken().then(()=>{
            if (this.navParams.get('pergunta')) {
              this.pergunta = this.navParams.get('pergunta')
              this.sendMessage()
            }
          })
        } else {
          this.nickname = this.navParams.get('nickname');
          this.localStorage.addItem('nickname', this.nickname)
          this.getToken().then(() => this.firstMessage())
        }
      }
    )
    this.localStorage.getItems('pergunta').then(
      (data) => {
        if (data) {
          this.pergunta = data
        }
      }
    )
    this.localStorage.getItems('resposta').then(
      (data) => {
        if (data) {
          this.resposta = data
        }
      }
    )
    this.localStorage.getItems('passo').then((passo) => {
      if (passo) {
        this.passoAtual = passo
      }
    })
  }

  getToken(){
    return this.localStorage.getItems('urlToken').then(
      (token) => {
        this.token = token
        this.msgJson.session_id = this.token
      }
    )
  }

 sendMessage() {
   console.log('Pergunta Enviada :' +this.pergunta);
   console.log('Token Enviado :' + this.token);
   this.msgJson.message = this.pergunta
   this.whatson.sendMsg(this.msgJson).subscribe((data)=>{     
     if (data && data!= 'undefined') {
       console.log('resposta watson' + data.output.generic[0].text);
       this.resposta = data.output.generic[0].text
       this.evaluateResposta()
       this.saveMessages()
     }
    })
  }

  firstMessage() {
    this.msgJson.message = this.nickname 
    this.whatson.sendMsg(this.msgJson).subscribe((data) => {
      this.resposta = data.output.generic[0].text
      this.evaluateResposta()
    })
  }

  saveMessages(){
    this.perguntas.push(this.pergunta)
    this.respostas.push(this.resposta)
    this.localStorage.addItem('perguntas', this.perguntas)
    this.localStorage.addItem('respostas', this.respostas)
    this.localStorage.addItem('pergunta', this.pergunta)
    this.localStorage.addItem('resposta', this.resposta)
    this.pergunta = ""
  }

  evaluateResposta(){
    if (this.resposta.indexOf('inválido') > 0 && this.resposta.indexOf('CPF') > 0) {
      this.passoAtual = 0
    }
    if (this.resposta.indexOf('inválida') > 0 && this.resposta.indexOf('senha') > 0) {
      this.passoAtual = 1
    }
    if (this.resposta.indexOf('celular') > 0 && this.resposta.indexOf('não é válido') > 0) {
      this.passoAtual = 2
    }

    if (this.resposta.indexOf('senha') > 0 || this.resposta.indexOf('token') > 0) {
      this.isFone = false
      this.isReal = false
      this.isCPF = false
      this.isPass = true 
    }
    if (this.resposta.indexOf('token') > 0) {
      this.presentToast('Use esse token para validar o seu celular: 1234')
      this.isFone = false
      this.isReal = false
      this.isCPF = false
      this.isPass = true 
    }
    if (this.resposta.indexOf('CPF') > 0) {
      this.isFone = false
      this.isReal = false
      this.isCPF = true
      this.isPass = false
    }
    if (this.resposta.indexOf('celular') > 0 ) {
      this.isFone = true 
      this.isReal = false
      this.isCPF = false 
      this.isPass = false    
    }
    if (this.resposta.indexOf('renda') > 0) {
      this.isFone = false
      this.isReal = true
      this.isCPF = false
      this.isPass = false 
    }
    if (this.resposta.indexOf('senha') < 0 && this.resposta.indexOf('token') < 0) {
      this.isPass = false 
    }
    if (this.resposta.indexOf('celular') < 0) {
      this.isFone = false
    }
    if (this.resposta.indexOf('renda') < 0) {
      this.isReal = false
    }
  }

  nextStep(){
 
    if (this.passoAtual == 0) {
      this.dados.cpf = this.pergunta
    }
    if (this.passoAtual == 1) {
      this.isCPF = false
    }
  
    if (this.passoAtual == 4) {
      this.planos()
    }
    if (this.passoAtual == 5) {
      this.takePicture()      
    }
    if (this.passoAtual == 6) {
      this.address()
    }
    if (this.passoAtual == 7) {
      this.home()
    }
    this.passoAtual++
    console.log('Passo Atual :'+this.passoAtual);
    
    if (this.passoAtual>this.passos.length){
      this.passoAtual = this.passos.length
    }
    this.localStorage.addItem('passo', this.passoAtual)
  }

  sendSMS(){
    this.navCtrl.push(SendSmsPage)
  }

  takePicture(){
    this.navCtrl.push(TakePicturePage)
  }

  planos() {
    this.navCtrl.push(PlanosPage)
  }

  address(){
    this.navCtrl.push(AddressPage)
  }

  home() {
    this.navCtrl.push(HomePage)
  }  

  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'top'
    });
    toast.present()
  }
}
