import { Ministrante } from 'src/app/model/ministrante';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../model/evento';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Evento[]>{
    return this.http.get<Evento[]>(`http://localhost:3000/eventos`);
  }

  findAllAvailable(): Observable<Evento[]>{
    return this.http.get<Evento[]>(`http://localhost:3000/eventos/disponiveis`);
  }

  createEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(`http://localhost:3000/eventos`, evento);
  }

  updateEvento(evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`http://localhost:3000/eventos`, evento);
  }

  deleteEvento(eventoId: number): Observable<Evento> {
    return this.http.post<Evento>(`http://localhost:3000/eventos`, eventoId);
  }

  findMinistrantes(): Observable<Ministrante[]>{
    return this.http.get<Ministrante[]>(`http://localhost:3000/ministrantes`);
  }

  findUsuarioByID(id: number): Observable<Ministrante[]>{
    return this.http.get<Ministrante[]>(`http://localhost:3000/usuarios/${id}`);
  }
}
