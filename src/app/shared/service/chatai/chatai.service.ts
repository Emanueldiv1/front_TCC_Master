import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatForm } from '../../form/chatai.form';
@Injectable({
  providedIn: 'root',
})
export class ChatAiService {
  private api: string = 'http://localhost:8080/chat';

  constructor(private http: HttpClient) {}

  public generateContent(message: ChatForm): Observable<any> {
    return this.http.post<any>(`${this.api}/generate`, message);
  }
}
