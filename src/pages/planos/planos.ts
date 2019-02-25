import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";
//import { ChatPage } from "../chat/chat";
import { ChatScrollPage } from "../chat-scroll/chat-scroll";
import { CustomPlanePage } from "../custom-plane/custom-plane";

 @Component({
  selector: 'page-planos',
  templateUrl: 'planos.html',
  providers:[
    LocalStorageProvider
  ]
})
export class PlanosPage {
   @ViewChild(Slides) slides: Slides;
   public nickname: string
   public plano: any = ''

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private localStorage:LocalStorageProvider) 
    {
    this.localStorage.getItems('nickname').then(
      (response) => {
          this.nickname = response
      }
    )
  }

  confirmPacote(){
    this.navCtrl.push(ChatScrollPage, { pergunta: 'plano_selecionado'})
  }

  goToCustomPlane(){
    this.navCtrl.push(CustomPlanePage)
  }

   chosePlano(el) {
     this.plano = el._elementRef.nativeElement.value 
  }

}
