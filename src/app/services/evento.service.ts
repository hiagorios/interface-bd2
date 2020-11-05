import { Injectable } from '@angular/core';
import * as Knex from 'knex';
import { Evento } from '../model/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(
    private knex: Knex
  ) { }

  findAllAvailable(): Evento[] {
    // TODO
    this.knex.raw('Select');
    return [];
  }
}
