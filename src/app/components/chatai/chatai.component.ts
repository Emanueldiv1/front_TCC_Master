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
        style="width: 90%; border-radius: 5px"
        type="text"
        [(ngModel)]="messageChat"
        placeholder="Nome do curso"
        (keyup.enter)="enviarMessageParaAi(messageChat)"
      />

      <button class="enviar" (click)="enviarMessageParaAi(messageChat)">
        Enviar
      </button>
      <button class="limpar" (click)="limparMensagens()">Limpar</button>
    </footer>
  `,
  styles: ` 
  .value {
    width: 100%;
    height: 74%;
    background-color: transparent;
    color: white;
    font-size:16px;
    padding: 10px;
    display: flex;
    border: 1px solid #ccc;
    justify-content: end;
    align-items: start;
    padding: 5%;
    flex-direction: column;
    border: none;
    font-family: "Montserrat";
    cursor: default;
    overflow-y: auto;
    line-height: 1.5;
    white-space: pre-wrap;

  }

  .enviar{
    width: 10%;
    height: 49px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 3px;
    font-size:20px
  }
  
    .limpar{
      background-color:#ad1a1a;
      width: 10%;
      height: 49px;
      border-radius: 5px;
      border: 2px solid white;
      background-color: transparent;
      cursor: pointer;
      margin-left: 5px;
      font-size:20px;
      color: white; 
    }
    .limpar:hover {
       background-color: red; 
       color: black; 
    }
  `,
})
export class ChatAIComponent implements OnInit {
  carregando: boolean = false;
  textoChat: string = ``;
  messageChat: string = '';
  nomeAluno: string = 'Emanuel';

  constructor(private serviceChatAi: ChatAiService) {}

  ngOnInit() {
    this.carregarMensagens(); // Carrega as mensagens salvas no localStorage
  }

  public enviarMessageParaAi(message: string) {
    let chatForm: ChatForm = new ChatForm();
    this.carregando = true;
    chatForm.message = message;
    this.serviceChatAi.generateContent(chatForm).subscribe((res) => {
      this.carregando = false;
      this.messageChat = ``;
      this.scrollToBottom();

      // Atualiza o texto do chat com a resposta da API, usando o nome do aluno
      this.textoChat +=
        '\n' +
        this.nomeAluno +
        ': ' +
        message +
        '\n' +
        'GEMINI: ' +
        res.message;

      // Chama o método para salvar a mensagem no localStorage
      this.salvarMensagem(message, res.message);
    });
  }

  scrollToBottom(): void {
    const messageContainer = document.querySelector('.messages');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }

  private salvarMensagem(mensagemUsuario: string, respostaAI: string) {
    // Recupera o array de mensagens do localStorage ou cria um novo se não existir
    let mensagensSalvas = JSON.parse(
      localStorage.getItem('chatMensagens') || '[]'
    );

    // Adiciona a nova mensagem e a resposta da AI ao array de mensagens
    mensagensSalvas.push({
      tipo: 'usuario',
      conteudo: mensagemUsuario,
      nome: this.nomeAluno, // Armazena o nome do aluno junto com a mensagem
    });
    mensagensSalvas.push({
      tipo: 'ai',
      conteudo: respostaAI,
    });

    // Salva o array atualizado no localStorage
    localStorage.setItem('chatMensagens', JSON.stringify(mensagensSalvas));
  }

  private carregarMensagens() {
    // Recupera o array de mensagens do localStorage
    let mensagensSalvas = JSON.parse(
      localStorage.getItem('chatMensagens') || '[]'
    );

    // Se houver mensagens, atualiza o textoChat com elas
    if (mensagensSalvas.length > 0) {
      this.textoChat = mensagensSalvas
        .map((msg: any) => {
          return (
            (msg.tipo === 'usuario' ? msg.nome + ': ' : 'GEMINI: ') +
            msg.conteudo
          );
        })
        .join('\n');
    }
  }

  public limparMensagens() {
    localStorage.removeItem('chatMensagens');
    this.textoChat = '';
  }
}
