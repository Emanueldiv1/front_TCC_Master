import { Curso } from './../../shared/model/Curso.model';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CursoService } from '../../shared/service/coordenador/curso.service';

@Component({
  selector: 'app-coordenador',
  imports: [FormsModule],
  standalone: true,
  template: `
    <header
      style="
  gap: 5px;"
    >
      <h1>Coordenador</h1>
      <img src="./assets/img/graduation-cap.png" style="height: 80%; " />
    </header>
    <main>
      <div class="head">
        <input
          [(ngModel)]="filtro"
          style="width: 30%"
          type="text"
          name="filtro"
          placeholder="Pesquisar"
          (ngModelChange)="filtrando(filtro!)"
        />
        <button (click)="criar = !criar">
          <img src="./assets/img/plus.png" width="20px" />
          <h2>Novo</h2>
        </button>
      </div>
      <div class="body">
        <div class="side">
          @if(criar) {
          <div class="form">
            <input
              class="card"
              type="text"
              style="width: 80%"
              placeholder="Nome do Curso"
              [(ngModel)]="nomeCurso"
            />
            <input
              class="card"
              type="submit"
              value="Criar"
              style="width: 20%"
              (click)="criarCurso(nomeCurso)"
            />
          </div>
          } @for(curso of listaDeCursoComFiltro; track $index) {
          <div class="card">
            <h2>{{ curso.nome }}</h2>
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
      height: 15%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 50px;
    }
    .body {
      width: 100%;
      height: 85%;
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
        .form {
          width: 100%;
          display: flex;
          .card {
            border-radius: 10px 0 0 10px
          }
          input[type=submit].card {
            border-radius: 0 10px 10px 0
          }
        }
        .card {
          width: 90%;
          height: auto;
          border: 2px solid #0feee0;
          margin: 15px 0 5px 0;
          padding: 15px;
          border-radius: 10px;
          background-color: #202124;
        }
      }
    }
  }
  `,
})
export class CoordenadorComponent implements OnInit {
  listaDeCurso: Curso[] = [];

  listaDeCursoComFiltro: Curso[] = [];

  filtro: string = '';

  criar: boolean = false;

  nomeCurso: string = '';

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    console.log(this.listaDeCurso);
    this.getCursos();
  }

  getCursos() {
    this.cursoService.getCursos().subscribe((success) => {
      this.listaDeCurso = success;
      this.listaDeCursoComFiltro = success;
    });
  }

  criarCurso(nomeCurso: string) {
    let curso: Curso = new Curso();
    curso.nome = nomeCurso;
    this.cursoService.saveCurso(curso).subscribe((success) => {
      this.filtro = '';
      this.nomeCurso = '';
      this.criar = false;
      console.log(success);
      this.getCursos();
    });
  }

  filtrando(ev: string) {
    console.log(ev);
    this.listaDeCursoComFiltro = this.listaDeCurso.filter((curso) =>
      curso.nome.toLowerCase().includes(ev.toLowerCase())
    );
  }
}
