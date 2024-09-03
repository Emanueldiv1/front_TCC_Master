import { AlunoService } from './../../shared/service/aluno/aluno.service';
import { Aluno } from './../../shared/model/Aluno.model';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-aluno',
  imports: [FormsModule, RouterLink],
  standalone: true,
  template: `
    <header>
      <h1>{{ aluno.nome }}</h1>
    </header>
    <main>
      <div class="head">
        <h2>{{ aluno.curso.nome }}</h2>
      </div>
      <div class="body">
        <div class="card">
          <img src="./assets/img/Chatting.png" />

          <!-- BOTAO QUE REDIRECIONA PRO CHAT COM O ORIENTADOR -->
          <button>
            <h2>Chat</h2>
            <img
              src="./assets/img/chat.png"
              style="width: 28px; height: 28px; filter: invert(100)"
            />
          </button>
        </div>
        <div class="card">
          <img src="./assets/img/Chatbot.png" />

          <!-- BOTAO QUE REDIRECIONA PRO CHAT COM A IA -->
          <button routerLink="/chat-ai">
            <h2>Gemini</h2>
            <img
              src="./assets/img/google-gemini-icon.png"
              style="width: 28px; height: 28px; filter: drop-shadow(0 0 5px white);"
            />
          </button>
        </div>
      </div>
    </main>
  `,
  styles: `

  main {
    width: 100%;
    height: 90vh;
    .head {
      width: 100%;
      height: 5%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .body {
      width: 100%;
      height: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3%;
        .card {
          width: 425px;
          height: 400px;
          margin: 15px 0 5px 0;
          padding: 20px;
          border-radius: 10px;
          background-color: #0feee36b;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          img {
            height: 350px;
          }
        }
      }
  }
  `,
})
export class AlunoComponent implements OnInit {
  aluno: Aluno = new Aluno();

  constructor(private alunoService: AlunoService) {}

  ngOnInit(): void {
    this.getAlunoById('13c004d3-e431-4b70-8e32-90bcd27b7b42');
  }

  getAlunoById(id: string) {
    this.alunoService
      .getAlunoById(id)
      .subscribe((success) => (this.aluno = success));
  }
}
