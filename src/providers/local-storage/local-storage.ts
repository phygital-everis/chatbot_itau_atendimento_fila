import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalStorageProvider {

  constructor(public http: HttpClient, private storage:Storage) {
    
  }

  // CREATE
  addItem(chave:string,value:any): Promise<any> {
    return this.storage.set(chave, value)
  }

  // READ
  getItems(chave: string): Promise<any> {
    return this.storage.get(chave)
  }

  // CLEAR
  clearAll(): Promise<any> {
    return this.storage.clear()
  }

}
