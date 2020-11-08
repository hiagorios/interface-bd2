import { Injectable } from '@angular/core';
import * as Knex from 'knex';
import { Evento } from '../model/evento';
import queries from '../model/queries';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(
    private knex: Knex
  ) { }

  findAllAvailable(): Evento[] {
    // TODO
    this.knex.raw(queries.evento.findAvailable);
    return [];
  }

  createEvento(evento: Evento): void {
    this.knex.raw(queries.evento.create);
  }

  updateEvento(evento: Evento): void {
    this.knex.raw(queries.evento.update);
  }

  deleteEvento(evento: Evento): void {
    this.knex.raw(queries.evento.delete);
  }
}
