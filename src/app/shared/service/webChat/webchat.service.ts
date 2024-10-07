import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '../../model/Chat-message';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebchatService {

  private stompClient: any;
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

  constructor() {
    this.initConnectionSocket(); // inicializa conexão com o socket
  }

  initConnectionSocket() {
    const url = '//localhost:8080/chat-socket'; //chamada do backend 
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(() => socket);
  }


  // entrar no chat
  joinRoom(roomId: string) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        const currentsMessage = this.messageSubject.getValue();
        currentsMessage.push(messageContent);
        
        this.messageSubject.next(currentsMessage);
        
      });// chamada do destinationPrefixed Backend
    });
  }

  // enviar mensagem
  sendMessage(roomId: string, chatMessage: ChatMessage) {
    console.log('Enviando mensagem:', chatMessage);
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage))

  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }

}
