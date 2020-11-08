import { Injectable } from '@angular/core';
import { Evento } from '../model/evento';
import queries from '../model/queries';
import db from './connection';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor() { }

  findAllAvailable(): Evento[] {
    // TODO
    db.raw(queries.evento.findAvailable);
    return [];
  }

  createEvento(evento: Evento): void {
    db.raw(queries.evento.create);
  }

  updateEvento(evento: Evento): void {
    db.raw(queries.evento.update);
  }

  deleteEvento(evento: Evento): void {
    db.raw(queries.evento.delete);
  }
}
