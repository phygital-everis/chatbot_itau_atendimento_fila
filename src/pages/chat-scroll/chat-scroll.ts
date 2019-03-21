import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController, Content, List } from 'ionic-angular';
import { WatsonapiProvider } from "../../providers/watsonapi/watsonapi";
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";
import { TakePicturePage } from "../take-picture/take-picture";
import { PlanosPage } from "../planos/planos";
import { AddressPage } from "../address/address";
import { HomePage } from "../home/home";
import { VideoPage } from "../video/video";
import { SendSmsPage } from "../send-sms/send-sms";
import { ModalHistoryPage } from '../modal-history/modal-history';
import { MessageScroll } from "../../models/message.model";

@Component({
  selector: 'page-chat-scroll',
  templateUrl: 'chat-scroll.html',
})
export class ChatScrollPage {
  @ViewChild(Content) content: Content
  @ViewChild(List, {read: ElementRef}) chatList: ElementRef

  public nickname: string
  public botName: string = "Santander"
  public messages = new Array<MessageScroll>()
  public message: MessageScroll = new MessageScroll()
  private token
  private mutationObserver: MutationObserver
  public next: boolean = false
  isPass: boolean = false
  isToken: boolean = false
  isCPF: boolean = false
  isFone: boolean = false
  isReal: boolean = false
  isDoc: boolean = false
  isEnd: boolean = false
  isPlan: boolean = false
  isVideo: boolean = false
  dados = {
    "cpf": "",
    "celular": "",
    "plano": "",
    "endereco": ""
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
    'Gravar vídeo',
    'Retornar para Home'
  ]
  public passoAtual = 0

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private whatson: WatsonapiProvider,
    private localStorage: LocalStorageProvider,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) {
    if (this.navParams.get('passo')) {
      this.passoAtual = this.navParams.get('passo')
      console.log(this.passoAtual);
      this.nextStep()
      
    }
    //verifica se o nickname já está gravado no localstorage
    this.localStorage.getItems('nickname').then(
      (response) => {
        if (response) {
          //se estiver em localstorage, resgata,
          this.nickname = response
          this.getToken().then(() => {
            //verifica a pergunta que foi passada via parametro
            if (this.navParams.get('pergunta')) {
              this.message.text = this.navParams.get('pergunta')
              this.message.from = this.nickname
              this.sendMessage()
            }
          })
        } else {
          //senão pega do navParams e salva e chama a pergunta inicial
          this.nickname = this.navParams.get('nickname');
          this.localStorage.addItem('nickname', this.nickname)
          this.getToken().then(() => this.firstMessage())
        }
      }
    )
    //se tiver pergunta em localstorage resgata
    this.localStorage.getItems('messages').then(
      (data) => {
        if (data) {
          this.messages = data
        }
      }
    )

    //recupera passo
    this.localStorage.getItems('passo').then((passo) => {
      if (passo) {
        this.passoAtual = passo
      }
    })
  }
  
  //recupera token salvo no localstorage
  getToken() {
    return this.localStorage.getItems('urlToken').then(
      (token) => {
        this.token = token
        this.msgJson.session_id = this.token
      }
    )
  }
  //envolve a mensagem em um json com o token junto. Envia e salva
  sendMessage() {
    this.msgJson.message = this.message.text
    this.message.from = this.nickname
    this.saveMessages()
    this.whatson.sendMsg(this.msgJson).subscribe((data) => {
      if (data && data != 'undefined') {
        this.message.from = 'Assistente virtual Itaú'
        this.message.text = data.output.generic[0].text
        this.evaluateResposta()
        this.saveMessages()
      }
    })
  }
//envia a mensagem 'oi' para iniciar a conversa
  firstMessage() {
    this.msgJson.message = this.nickname
    this.whatson.sendMsg(this.msgJson).subscribe((data) => {
      this.message.text = data.output.generic[0].text
      this.message.from = 'Assistente virtual Itaú'
      this.evaluateResposta()
      this.saveMessages()
    })
  }

  evaluateResposta() {
    if (this.message.text.indexOf('inválido') > 0 && this.message.text.indexOf('CPF') > 0) {
      this.passoAtual = 0
    }
    if (this.message.text.indexOf('inválida') > 0 && this.message.text.indexOf('senha') > 0) {
      this.passoAtual = 1
    }
    if (this.message.text.indexOf('celular') > 0 && this.message.text.indexOf('não é válido') > 0) {
      this.passoAtual = 2
    }

    if (this.message.text.indexOf('senha') > 0) {
      this.isFone = false
      this.isReal = false
      this.isCPF = false
      this.isPass = true
      this.isToken = false
    }
    if (this.message.text.indexOf('token') > 0) {
      this.presentToast('Use esse token para validar o seu celular: 1234')
      this.isFone = false
      this.isReal = false
      this.isCPF = false
      this.isPass = false
      this.isToken = true
    }
    if (this.message.text.indexOf('CPF') > 0) {
      this.isFone = false
      this.isReal = false
      this.isCPF = true
      this.isPass = false
      this.isToken = false
    }
    if (this.message.text.indexOf('celular') > 0) {
      this.isFone = true
      this.isReal = false
      this.isCPF = false
      this.isPass = false
      this.isToken = false
    }
    if (this.message.text.indexOf('renda') > 0) {
      this.isFone = false
      this.isReal = true
      this.isCPF = false
      this.isPass = false
      this.isToken = false
    }
    if (this.message.text.indexOf('senha') < 0 && this.message.text.indexOf('token') < 0) {
      this.isPass = false
    }
    if (this.message.text.indexOf('celular') < 0) {
      this.isFone = false
    }
    if (this.message.text.indexOf('renda') < 0) {
      this.isReal = false
    }
  }
//salva as perguntas, respostas e última pergunta e última resposta
  saveMessages() {
    console.log(this.message.from+' : '+this.message.text);
    
    let msg = new MessageScroll()
    msg.from = this.message.from
    msg.text = this.message.text
    console.log(msg.text);
    this.messages.push(msg)

    this.localStorage.addItem('messages', this.messages)
    this.message.text = ""
    this.message.from = ""
  }
//
  nextStep() {
    console.log('passo: ' + this.passoAtual);
    
    if (this.passoAtual == 0) {
      this.dados.cpf = this.message.text
    }
    if (this.passoAtual == 1) {
      this.isCPF = false
    }
    if (this.passoAtual == 4) {
      this.isPlan = true
    }
    if (this.passoAtual == 5) {
      this.isPlan = false
      this.isDoc = true
    }
    if (this.passoAtual == 6) {
      this.isPlan = false
      this.isDoc = false
      this.isEnd = true
    }
    if (this.passoAtual == 7) {
      this.isPlan = false
      this.isDoc = false
      this.isEnd = false
      this.isVideo = true

    }
    if (this.passoAtual == 8) {
      this.isPlan = false
      this.isDoc = false
      this.isEnd = false
      this.isVideo = false
      setTimeout(() => {
        this.home();
      }, 5000);
    }
    this.passoAtual++
    if (this.passoAtual > this.passos.length) {
      this.passoAtual = this.passos.length
    }
    this.localStorage.addItem('passo', this.passoAtual)
  }

  sendSMS() {
    this.navCtrl.push(SendSmsPage)
  }

  takePicture() {
    this.navCtrl.push(TakePicturePage)
  }

  planos() {
    this.navCtrl.push(PlanosPage)
  }

  address() {
    this.navCtrl.push(AddressPage)
  }

  home() {
    this.navCtrl.setRoot(HomePage)
  }

  video() {
    this.navCtrl.push(VideoPage)
  }

  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'top'
    });
    toast.present()
  }

  presentModal(tipo) {
    const modal = this.modalCtrl.create(ModalHistoryPage, { tipo: tipo });
    modal.present();
  }

  scrollDown() { 
    this.content.scrollToBottom()
  }
  ionViewDidLoad(){
            
    this.mutationObserver = new MutationObserver((mutations) => {
      this.content.scrollToBottom();
    });
    
    this.mutationObserver.observe(this.chatList.nativeElement, {
      childList: true
    });
    
  }
}
