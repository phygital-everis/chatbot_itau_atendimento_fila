import { Component } from '@angular/core';
import { NavController, NavParams, ViewController  } from 'ionic-angular';
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";

@Component({
  selector: 'page-modal-history',
  templateUrl: 'modal-history.html',
})
export class ModalHistoryPage {

  tipo
  public dados = new Array()

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private localStorage: LocalStorageProvider,
    public viewCtrl: ViewController
    ) {   
    this.tipo = this.navParams.get('tipo')

    if (this.tipo == 'pergunta') {
      this.showPerguntasHistory()
    }else if(this.tipo == 'resposta'){
      this.showRespostasHistory()
    }
  }

  showPerguntasHistory() {
    this.localStorage.getItems('perguntas').then(data => {
      this.dados = data
    })
  }

  showRespostasHistory() {
    this.localStorage.getItems('respostas').then(data => {
      this.dados = data
    })
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  

}
