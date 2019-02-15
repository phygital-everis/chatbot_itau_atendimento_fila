import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SMS } from '@ionic-native/sms';
import { Sim } from '@ionic-native/sim';

@Injectable()
export class SendSmsProvider {

  constructor(
    public http: HttpClient,
    private sms: SMS,
    private sim:Sim
  ) {
    
  }
  getSimInfo(){
    this.sim.getSimInfo().then(
      (info) => console.log('Sim info: ', info),
      (err) => console.log('Unable to get sim info: ', err)
    );
  }
  sendMessage(msg:string) {
    this.getSimInfo();
    this.sms.send('11959295564', msg);
  }
}


