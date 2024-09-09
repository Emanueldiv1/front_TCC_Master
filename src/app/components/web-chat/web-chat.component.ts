import { Component, OnInit } from '@angular/core';
import { WebchatService } from '../../shared/service/webChat/webchat.service';
import { ChatMessage } from '../../shared/model/Chat-message';

@Component({
  selector: 'app-web-chat',
  standalone: true,
  imports: [],
  templateUrl: './web-chat.component.html',
  styleUrl: './web-chat.component.scss'
})
export class WebChatComponent implements OnInit {

  constructor(private webchatService: WebchatService) {
  }

  ngOnInit(): void {
    this.webchatService.joinRoom("paraChat"); // nome da chat 
  }

  sendMessage() {
    const webchatMessage = {
      message: 'One Piece Message',
      user: '1'
    } as ChatMessage
    this.webchatService.sendMessage("paraChat", webchatMessage);
  }
}
