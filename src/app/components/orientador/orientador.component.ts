import { OrientadorService } from '../../shared/service/orientador/orientador.service';
import { Orientador } from './../../shared/model/Orientador.model';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Aluno } from '../../shared/model/Aluno.model';

@Component({
  selector: 'app-orientador',
  imports: [FormsModule],
  standalone: true,
  template: `
    <header>
      <h1>{{ orientador.nome }}</h1>
    </header>
    <main>
      <div class="head">
        <input
          [(ngModel)]="filtro"
          style="width: 30%; border-radius: 10px 0 0 10px"
          type="text"
          name="filtro"
          placeholder="Pesquisar"
          (ngModelChange)="filtrando(filtro!)"
        />
        <img
          src="./assets/img/search.png"
          width="20px"
          style="padding: 12.5px; border-left: 0; border: 2px solid #0feee0; border-radius: 0 10px 10px 0"
        />
      </div>
      <div class="body">
        <div class="side">
          @for(aluno of listaDeAlunoComFiltro; track $index) {
          <div class="card">
            <div class="profile" style="width: 10%;">
              <img src="./assets/img/profile-user.png" style="height: 30px" />
            </div>

            <h2 style="width: 65%; padding-left: 5%;">{{ aluno.nome }}</h2>
            <h4>{{ aluno.curso.nome }}</h4>
            <div class="chat" style="width: 20%;">
              <img src="./assets/img/chat.png" style="height: 45px" />
            </div>
          </div>
          }
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
      height: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .body {
      width: 100%;
      height: 90%;
      display: flex;
      align-items: center;
      justify-content: center;
      .side {
        width: 38%;
        height: 100%;
        overflow-y: auto;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 0 15px 0 15px;
        .card {
          width: 90%;
          height: auto;
          border: 2px solid #0feee0;
          margin: 15px 0 5px 0;
          padding: 15px;
          border-radius: 10px;
          background-color: #202124;
          display: flex;
          align-items: center;
          justify-content: center;
          .profile {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .chat {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
  `,
})
export class OrientadorComponent implements OnInit {
  orientador: Orientador = new Orientador();

  listaDeAlunoComFiltro!: Array<Aluno>;

  filtro: string = '';

  constructor(private orientadorService: OrientadorService) {}

  ngOnInit(): void {
    this.orientadorService
      .getOrientadorById('13c004d3-e431-4b70-8e32-90bcd27b7b41')
      .subscribe((success) => {
        this.orientador = success;
        this.listaDeAlunoComFiltro = success.aluno;
      });
  }

  filtrando(ev: string) {
    this.listaDeAlunoComFiltro = this.orientador.aluno.filter((aluno) => {
      const nomeMatch = aluno.nome.toLowerCase().includes(ev.toLowerCase());
      const cursoMatch = aluno.curso.nome
        .toLowerCase()
        .includes(ev.toLowerCase());
      return nomeMatch || cursoMatch;
    });
  }
}
