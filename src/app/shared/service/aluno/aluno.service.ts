import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../../model/Aluno.model';
@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  private api: string = 'http://localhost:8080/alunos';

  constructor(private http: HttpClient) {}

  public getAlunoById(id: string): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.api}/${id}`);
  }
}
