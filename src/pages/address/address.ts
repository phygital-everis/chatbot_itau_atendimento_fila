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

  public procedimento: string = "Buscar endereço";
  nickname;
  input;

  endereco = {
    "cep": "",
    "logradouro": "",
    "numero":"",
    "bairro": "",
    "localidade": "",
    "uf": "",
    "complemento": ""
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
    this.buscaCep.getAddress(this.input).subscribe((address)=>{
      if(address){
        this.endereco = address;        
        this.procedimento = "número, complemento";
      }        
    });
  }

  infoComplement(){
    this.input = "";
    this.procedimento = "Confirmar";
  }

  confirmAddress(){
    if (String(this.input).indexOf(',') > 0) {
      this.endereco.numero = String(this.input).split(',')[0].trim();
      this.endereco.complemento = String(this.input).split(',')[1].trim();
    }
    this.navCtrl.push(ChatScrollPage, { pergunta: 'Endereço enviado!', passo: 7});
  }
}
