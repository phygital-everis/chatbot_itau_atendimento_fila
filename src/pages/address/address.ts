import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";
import { BuscaCepProvider } from "../../providers/busca-cep/busca-cep";
//import { ChatPage } from "../chat/chat";
import { ChatScrollPage } from "../chat-scroll/chat-scroll";

@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
  providers: [BuscaCepProvider]
})
export class AddressPage {

  nickname
  cep

  endereco = {
    "cep": "",
    "logradouro": "",
    "numero":"",
    "bairro": "",
    "localidade": "",
    "uf": ""
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private localStorage: LocalStorageProvider,
    private buscaCep: BuscaCepProvider
) {
    this.localStorage.getItems('nickname').then(
      (response) => {
        this.nickname = response
      }
    )
  }

  searchCep(){
    this.buscaCep.getAddress(this.cep).subscribe((address)=>{
        this.endereco = address
    });
  }

  confirmAddress(){
    this.navCtrl.push(ChatScrollPage, { pergunta: 'endereco_confirmado' })
  }
}
