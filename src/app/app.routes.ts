import { Routes } from '@angular/router';
import { CoordenadorComponent } from './components/coordenador/coordenador.component';
import { OrientadorComponent } from './components/orientador/orientador.component';
import { AlunoComponent } from './components/aluno/aluno.component';
import { ChatAIComponent } from './components/chatai/chatai.component';

export const routes: Routes = [
  { path: `coordenador`, component: CoordenadorComponent },
  { path: `orientador`, component: OrientadorComponent },
  { path: `aluno`, component: AlunoComponent },
  { path: `chat-ai`, component: ChatAIComponent },
];
