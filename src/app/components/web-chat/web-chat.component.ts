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
  //styleUrl: './web-chat.component.scss'
})
export class WebChatComponent implements OnInit {

  messageInput: string = '';
  userId: string = "";
  messageList: any = [];

  constructor(private webchatService: WebchatService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"];
    this.webchatService.joinRoom("paraChat"); // nome da chat 
    this.lisenerMessage(); 
  }

  sendMessage() {
    const webchatMessage = {
      message: this.messageInput,
      user: '1'
    } as ChatMessage
    this.webchatService.sendMessage("paraChat", webchatMessage);
    this.messageInput = '';
  }

  lisenerMessage() {
    this.webchatService.getMessageSubject().subscribe((messages: any) => {
      this.messageList = messages.map((item: any)=> ({
        ...item,
        message_side: item.user === this.userId ? 'sender': 'receiver'
      }))
    });
    
  }
}
