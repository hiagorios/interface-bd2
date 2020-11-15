import { EventoList } from './../model/evento-list';
import { Ministrante } from 'src/app/model/ministrante';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../model/evento';
import { Usuario } from '../model/usuario';
import { EventoCreate } from '../model/evento-create';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  findAllEventos(): Observable<EventoList[]> {
    return this.http.get<EventoList[]>(`http://localhost:3000/eventos`);
  }

  findAllEventosExcluindo(idNot: number): Observable<Evento[]> {
    return this.http.get<Evento[]>(`http://localhost:3000/eventos/idNot/${idNot}`);
  }

  findEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`http://localhost:3000/eventos/id/${id}`);
  }

  findAllEventosDisponiveis(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`http://localhost:3000/eventos/disponiveis`);
  }

  createEvento(evento: EventoCreate): Observable<Evento> {
    return this.http.post<Evento>(`http://localhost:3000/eventos`, evento);
  }

  updateEvento(evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`http://localhost:3000/eventos`, evento);
  }

  deleteEvento(eventoId: number) {
    return this.http.delete(`http://localhost:3000/eventos/${eventoId}`);
  }

  findMinistrantes(): Observable<Ministrante[]> {
    return this.http.get<Ministrante[]>(`http://localhost:3000/ministrantes`);
  }

  findMinistranteByEventoID(eventoId: number): Observable<Ministrante[]> {
    return this.http.get<Ministrante[]>(`http://localhost:3000/ministrantes/evento/${eventoId}`);
  }

  findUsuarioByID(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`http://localhost:3000/usuarios/${id}`);
  }

  getUsuarioAutenticadoID(): number {
    return 3;
  }
}
