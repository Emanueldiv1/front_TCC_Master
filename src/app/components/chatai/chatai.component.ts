import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatAiService } from '../../shared/service/chatai/chatai.service';
import { ChatForm } from '../../shared/form/chatai.form';
import { Aluno } from '../../shared/model/Aluno.model';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingComponent } from '../component/loader.component';

@Component({
  selector: 'app-chatai',
  imports: [FormsModule, LoadingComponent],
  standalone: true,
  template: `
    <header class="invert">
      <h1>GEMINI</h1>
    </header>
    <main
      style="width: 100%;height: 83vh; display: flex; justify-content: center; align-items: center;"
    >
      @if(carregando) {<LOADER />} @else {
      <textarea
        style="resize: none;"
        class="value"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        readonly
      >
        {{ textoChat }}
      </textarea
      >
      }
    </main>
    <footer
      style="width: 100%; height: 7vh; display: flex; justify-content: center; align-items: end;"
    >
      <input
        style="width: 90%; border-radius: 0"
        type="text"
        [(ngModel)]="messageChat"
        placeholder="Ex. Gere 4 temas para TCC de {{ aluno.curso.nome }}"
      />
      <input
        type="submit"
        style="width: 10%;height: 49px; border-radius: 0;
    cursor: pointer;"
        (click)="enviarMessageParaAi(messageChat)"
        value="Enviar"
      />
    </footer>
  `,
  styles: `
  .value {
    width: 100%;
    height: 74%;
    background-color: transparent;
    color: white;
    font-size:16px;
    display: flex;
    justify-content: end;
    align-items: start;
    padding: 5%;
    flex-direction: column;
    border: none;
    font-family: "Montserrat", sans-serif;
    cursor: default;
  }
  `,
})
export class ChatAIComponent {
  aluno: Aluno = {
    id: '13c004d3-e431-4b70-8e32-90bcd27b7b41',
    nome: 'Guilherme',
    cpf: '123.123.123-12',
    senha: '12345678.',
    curso: { id: 2, nome: 'Ciencia da Computacao' },
  };

  carregando: boolean = false;

  textoChat: string = ``;

  messageChat: string = '';

  constructor(private serviceChatAi: ChatAiService) {}

  public enviarMessageParaAi(message: string) {
    let chatForm: ChatForm = new ChatForm();
    this.carregando = true;
    chatForm.message = message;
    this.serviceChatAi.generateContent(chatForm).subscribe((res) => {
      this.carregando = false;
      this.messageChat = ``;
      this.textoChat = res.message;
    });
  }
}
