import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WebchatService } from '../../shared/service/webChat/webchat.service';
import { ChatMessage } from '../../shared/model/Chat-message';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-web-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './web-chat.component.html',
  styleUrls: ['./web-chat.component.scss'],
})
export class WebChatComponent implements OnInit {
  messageInput: string = '';
  userId: string = '';
  messageList: any = [];

  constructor(
    private webchatService: WebchatService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.webchatService.joinRoom('SalaMensagem');
    this.lisenerMessage();
  }

  sendMessage() {
    const chatMessage = {
      message: this.messageInput,
      user: this.userId,
    } as ChatMessage;
    this.webchatService.sendMessage('SalaMensagem', chatMessage);
    this.messageInput = '';
  }

  scrollToBottom(): void {
    const messageContainer = document.querySelector('.messages');
    if (messageContainer) {
      setTimeout(() => {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }, 0);
    }
  }

  lisenerMessage() {
    this.webchatService.getMessageSubject().subscribe((messages: any) => {
      console.log('Mensagens recebidas: ', messages);
      this.messageList = messages.map((item: any) => ({
        ...item,
        message_side: item.user === this.userId ? 'sender' : 'receiver',
      }));
      this.cdRef.detectChanges();
      this.scrollToBottom();
    });
  }
}
