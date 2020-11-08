import { EventoService } from './../../../services/evento.service';
import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/model/evento';

@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.scss']
})
export class EventoListComponent implements OnInit {

  eventos: Evento[];

  constructor(
    private service: EventoService
  ) { }

  ngOnInit(): void {
    this.service.findAll().subscribe(res => {
      this.eventos = res;
    });
  }

}
