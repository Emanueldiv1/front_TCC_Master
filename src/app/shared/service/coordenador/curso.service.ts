import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../../model/Curso.model';
@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private api: string = 'http://localhost:8080/cursos';

  constructor(private http: HttpClient) {}

  public getCursos(): Observable<Array<Curso>> {
    return this.http.get<Array<Curso>>(`${this.api}/todos`);
  }

  public saveCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.api}`, curso);
  }
}
