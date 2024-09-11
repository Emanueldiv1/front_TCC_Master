import { Component, OnInit } from '@angular/core';
import { WebchatService } from '../../shared/service/webChat/webchat.service';
import { ChatMessage } from '../../shared/model/Chat-message';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importe o FormsModule
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-web-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './web-chat.component.html',
  styleUrls: ['./web-chat.component.scss'] 
})
export class WebChatComponent implements OnInit {

  messageInput: string = '';
  userId: string = "";
  messageList: any = [];

  constructor(private webchatService: WebchatService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"];
    this.webchatService.joinRoom("SalaMensagem"); // nome da chat 
    this.lisenerMessage(); 
  }

  sendMessage() {
    const chatMessage = {
      message: this.messageInput,
      user: '1'
    } as ChatMessage
    this.webchatService.sendMessage("SalaMensagem", chatMessage);
    this.messageInput = '';
  }

  lisenerMessage() {
    this.webchatService.getMessageSubject().subscribe((messages: any) => {
      console.log('Mensagens recebidas: ', messages); // Log para verificar a recepção de mensagens
      this.messageList = messages.map((item: any) => ({
        ...item,
        message_side: item.user === this.userId ? 'sender' : 'receiver'
      }));
  
      console.log('Lista de mensagens atualizada: ', this.messageList); // Log para verificar se messageList foi atualizado
    });
  }
}
