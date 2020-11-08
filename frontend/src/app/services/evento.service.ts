import { EventoUpdate } from './../../../../backend/src/model/evento-update';
import { EventoCreate } from './../../../../backend/src/model/evento-create';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../model/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(
    private http: HttpClient
  ) { }

  findAllAvailable(): Observable<Evento[]>{
    return this.http.get<Evento[]>(`http://localhost:3000/events/available`);
  }

  createEvento(evento: EventoCreate): Observable<Evento> {
    return this.http.post<Evento>(`http://localhost:3000/events`, evento);
  }

  updateEvento(evento: EventoUpdate): Observable<Evento> {
    return this.http.put<Evento>(`http://localhost:3000/events`, evento);
  }

  deleteEvento(eventoId: number): Observable<Evento> {
    return this.http.post<Evento>(`http://localhost:3000/events`, eventoId);
  }
}
