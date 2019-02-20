import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class WatsonapiProvider {

  apiUrlsession ='https://damp-atoll-69989.herokuapp.com/api/session'
  apiUrlmsg = 'https://damp-atoll-69989.herokuapp.com/api/sendmessage'

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  options = {
    headers: this.headers
  }

  constructor(public http: HttpClient) {

  }

  initChat(): Observable<any> {
    return this.http.get(this.apiUrlsession)
  }


  sendMsg(msg: any): Observable<any> {
    return this.http.post(this.apiUrlmsg, msg)
  }

}
