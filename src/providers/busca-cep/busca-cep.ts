import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class BuscaCepProvider {

  private cepApi = "https://viacep.com.br/ws/" 
  private cepEndPoint = "/json/"

  constructor(public http: HttpClient) {
   
  }

  getAddress(cep): Observable<any> {
    let api = this.cepApi + cep + this.cepEndPoint
    return this.http.get(api)
  }

}
