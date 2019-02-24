import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Message } from "../../models/message.model";
import { Serializer } from "../../models/serializer";

@Injectable()
export class HttpGenericProvider {

  private url = 'https://damp-atoll-69989.herokuapp.com/api/sendmessage';
  private endpoint = '';
  private serializer = new Serializer();

  constructor(
    protected httpClient: HttpClient) { }

  public create(message: Message): Observable<Message> {
    return this.httpClient
      .post<Message>(`${this.url}/${this.endpoint}`, message)
      .map(data => this.serializer.fromJson(data));
  }

  public update(message: Message): Observable<Message> {
    return this.httpClient
      .put<Message>(`${this.url}/${this.endpoint}/${message.id}`, message);
  }

  read(id: number): Observable<Message> {
    return this.httpClient
      .get<Message>(`${this.url}/${this.endpoint}/${id}`);
  }

  list(): Observable<Message[]> {
    return this.httpClient
      .get<Message[]>(`${this.url}/${this.endpoint}`);
  }

  delete(id: number) {
    return this.httpClient
      .delete(`${this.url}/${this.endpoint}/${id}`);
  }


}
