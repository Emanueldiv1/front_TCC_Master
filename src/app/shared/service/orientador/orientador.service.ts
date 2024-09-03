import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orientador } from '../../model/Orientador.model';
@Injectable({
  providedIn: 'root',
})
export class OrientadorService {
  private api: string = 'http://localhost:8080/orientador';

  constructor(private http: HttpClient) {}

  public getOrientadorById(id: string): Observable<Orientador> {
    return this.http.get<Orientador>(`${this.api}/${id}`);
  }
}
