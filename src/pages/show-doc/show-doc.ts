import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { ChatPage } from "../chat/chat";
import { ChatScrollPage } from "../chat-scroll/chat-scroll";


@Component({
  selector: 'page-show-doc',
  templateUrl: 'show-doc.html',
})
export class ShowDocPage {

  public doc
  public fields
  private data
  public tipoDoc
  dados={
    'nome':'',
    'filiacao':'',
    'rg':'',
    'cpf':'',
    'nasc':''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get('data');
    this.tipoDoc = this.navParams.get('tipo')
    this.doc = this.data.responses[0].textAnnotations;
    this.fields = this.doc.map((field)=>{
      return field.description
    })
    console.log(this.fields);
    this.fillDados()     
  }

  fillDados(){
    switch (this.tipoDoc) {
      case 'RG':
        this.fillRG()
        break;
      case 'CNH':
        this.fillCNH()
        break;
      case 'RNE':
        this.fillRNE()
        break;
    
      
    }
  }

  fillCNH(){
    this.dados.rg = this.fields[(this.fields.indexOf('ESP') - 1)]
    this.dados.cpf = this.fields[(this.fields.indexOf('SOMENTO') + 1)] + 
      this.fields[(this.fields.indexOf('SOMENTO') + 2)] +
      this.fields[(this.fields.indexOf('SOMENTO') + 3)] +
      this.fields[(this.fields.indexOf('SOMENTO') + 4)] +
      this.fields[(this.fields.indexOf('SOMENTO') + 5)] +
      this.fields[(this.fields.indexOf('SOMENTO') + 6)] +
      this.fields[(this.fields.indexOf('SOMENTO') + 7)]
    this.dados.nasc = this.fields[(this.fields.indexOf('SOMENTO') + 8)]+
      this.fields[(this.fields.indexOf('SOMENTO') + 9)] +
      this.fields[(this.fields.indexOf('SOMENTO') + 10)] +
      this.fields[(this.fields.indexOf('SOMENTO') + 11)] +
      this.fields[(this.fields.indexOf('SOMENTO') + 12)]

    let inicio = this.fields.indexOf('HABILITACAO')+1
    let final = this.fields.indexOf('DOC')
    
    for (let index = inicio; index < final; index++) {
      this.dados.nome += this.fields[index] + ' '      
    }

  }
  fillRG() {

  }
  fillRNE() {

  }

  confirm(){
    this.navCtrl.push(ChatScrollPage,{ pergunta: 'doc_enviado' });
  }

}
