import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NicknamePage } from '../nickname/nickname';
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [LocalStorageProvider]
})
export class HomePage {


  constructor(
    public navCtrl: NavController, 
    private localstorage: LocalStorageProvider
    ) {

     }
  

  ionViewDidLoad(){
    this.localstorage.clearAll()
  }

  joinChat() {
    
    this.navCtrl.push(NicknamePage);
  }

}
