import { Aluno } from './Aluno.model';

export class Orientador {
  id!: string;
  nome!: string;
  cpf!: string;
  senha!: string;
  aluno!: Array<Aluno>;
}
