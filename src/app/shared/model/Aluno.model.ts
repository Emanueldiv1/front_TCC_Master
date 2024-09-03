import { Curso } from './Curso.model';

export class Aluno {
  id!: string;
  nome!: string;
  cpf!: string;
  senha!: string;
  curso!: Curso;
}
