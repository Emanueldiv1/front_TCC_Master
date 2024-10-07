import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatAiService } from '../../shared/service/chatai/chatai.service';
import { ChatForm } from '../../shared/form/chatai.form';
import { Aluno } from '../../shared/model/Aluno.model';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingComponent } from '../component/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatai',
  imports: [FormsModule, LoadingComponent, CommonModule],
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
      <button class="duvida" (click)="duvida()"><strong>?</strong></button>
    </footer>
    <div class="modal" [ngClass]="{ 'is-active': abrir }">
      <div class="modal-content">
        <div class="box">
          <h2>Instruções de Uso</h2>
          <p>
            Insira apenas o nome do <strong>curso</strong> no campo indicado
            para garantir que a aplicação funcione corretamente. Evite utilizar
            perguntas no campo abaixo.
          </p>
          <button class="close" (click)="fechar()">Fechar</button>
        </div>
      </div>
    </div>
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
    margin-left: 3px;
    font-size:20px
  }

  .enviar:hover {
    cursor: pointer;
    opacity: 0.8; 
  }
  
  .limpar{
    background-color:#ad1a1a;
    width: 10%;
    height: 49px;
    border-radius: 5px;
    border: 2px solid white;
    background-color: transparent;
    margin-left: 5px;
    font-size:20px;
    color: white; 
  }

  .limpar:hover {
    cursor: pointer;
     background-color: red; 
     color: black; 
  }

  .duvida {
    position: absolute;
    top: 10px; 
    right: 14px; 
    width: 50px;
    height: 50px;
    border-radius: 5px;
    background-color: #202124;
    color: white;
    font-size: 17px;
    cursor: pointer;
  }
  
  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    backdrop-filter: blur(4px);
    align-items: center;
  }

  .modal.is-active {
    display: flex;
  }

  .modal .box {
    background: #202124;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap:12px;
  }

  



  .close:hover{
    cursor: pointer;
    opacity: 0.8; 
  }

  .modal-content{
    max-width:626px;
    width: 100%;
  }
  `,
})
export class ChatAIComponent implements OnInit {
  carregando: boolean = false;
  textoChat: string = ``;
  messageChat: string = '';
  nomeAluno: string = 'Emanuel';
  abrir: boolean = false;

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

  duvida() {
    this.abrir = true;
  }

  fechar() {
    this.abrir = false;
  }
}
