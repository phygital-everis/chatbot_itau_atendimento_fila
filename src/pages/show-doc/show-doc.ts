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
    //console.log(this.fields);
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
    
    let inicio;
    let final;

    //PEGA O NOME
    if (this.fields.indexOf('NOME')) {
      this.dados.nome = this.fields[(this.fields.indexOf('NOME') + 1)] + ' '
        + this.fields[(this.fields.indexOf('NOME') + 2)] + ' '
        + this.fields[(this.fields.indexOf('NOME') + 3)] + ' '
        + this.fields[(this.fields.indexOf('NOME') + 4)];
    }

    //PEGA O NÚMERO DO RG
    if(this.fields.indexOf('GERAL')) {
      this.dados.rg = this.fields[(this.fields.indexOf('GERAL') + 1)]
        + this.fields[(this.fields.indexOf('GERAL') + 2)]
        + this.fields[(this.fields.indexOf('GERAL') + 3)]
        + this.fields[(this.fields.indexOf('GERAL') + 4)]
        + this.fields[(this.fields.indexOf('GERAL') + 5)]
        + this.fields[(this.fields.indexOf('GERAL') + 6)]
        + this.fields[(this.fields.indexOf('GERAL') + 7)];
    }

    //PEGA O NÚMERO DO CPF
    if(this.fields.indexOf('CPF')) {
      this.dados.cpf = this.fields[(this.fields.indexOf('CPF') + 1)]
        + this.fields[(this.fields.indexOf('CPF') + 2)] +
        + this.fields[(this.fields.indexOf('CPF') + 3)];
    }

    //PEGA A DATA DE NASCIMENTO
    if(this.fields.indexOf('DOC')) {
      this.dados.nasc = this.fields[(this.fields.indexOf('DOC') - 5)]
        + this.fields[(this.fields.indexOf('DOC') - 4)]
        + this.fields[(this.fields.indexOf('DOC') - 3)]
        + this.fields[(this.fields.indexOf('DOC') - 2)]
        + this.fields[(this.fields.indexOf('DOC') - 1)];
    }

    //PEGA A FILIAÇÃO
    if(this.fields.indexOf('FILIAÇÃO' || 'FLAC' || 'FILIACAO' 
      || 'FILIAÇAO' || 'FLIACAO')) {

        inicio = this.fields.indexOf('FILIAÇÃO' || 'FLAC' || 'FILIACAO' 
          || 'FILIAÇAO' || 'FLIACAO') + 1;
        final = this.fields.indexOf('NATURALIDADE');
  
        for (let i = inicio; i < final; i++) {
          this.dados.filiacao += this.fields[i] + ' '
        }
      }
  }
  fillRNE() {

  }

  confirm(){
    this.navCtrl.push(ChatScrollPage, { pergunta: 'Documento enviado!', passo: 6 });
  }

}
