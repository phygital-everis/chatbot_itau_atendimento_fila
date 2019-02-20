import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
/*
  Generated class for the VisionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VisionProvider {

  private url = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDr-38LULqBLMxncojrjdlE7kDVSp-DlIg'

  private json = {
    "requests": [
      {
        "image": {
          "content": ""
        },
        "features": [
          {
            "type": "DOCUMENT_TEXT_DETECTION",
            "maxResults": 1
          }
        ]
      }
    ]
  }

  constructor(public http: HttpClient) {
    
  }

  public sendVision(content: any): Observable<any> {
    
    this.json.requests[0].image.content = content
   
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http
      .post<any>(`${this.url}`, this.json, { headers: headers })
  }

}
