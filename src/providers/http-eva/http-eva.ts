import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpEvaProvider {

  apiUrl = 'http://35.239.5.7:8080/conversations'

  initialText = {
    "text": "oi"
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'API-KEY':'keykey',
    'PROJECT':'everBank POC',
    'OS':'Windows',
    'USER-REF':'35.239.5.7',
    'LOCALE':'pt-br',
    'CHANNEL':'Web'
  });

  options = {
    headers: this.headers
  }

  constructor(public http: HttpClient) {

  }

  initChat(): Observable<any>{
    return this.sendMsgInit(this.initialText)
  }

  sendMsgInit(msg:any):Observable<any>{  
    return this.http.post(this.apiUrl,msg,this.options)
  }

  sendMsg(msg: any,token:any): Observable<any> {
    let apiUrlEnd = this.apiUrl + '/' + token
    return this.http.post(apiUrlEnd, msg, this.options)
  }

}
