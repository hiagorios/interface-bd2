import { AppService } from '../../../services/app.service';
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
    private service: AppService
  ) { }

  ngOnInit(): void {
    this.buscarEventos();
  }

  deletarEvento(id: number): void {
    this.service.deleteEvento(id).subscribe(() => {
      console.log(`Evento deletado. ID ${id}`);
      this.buscarEventos();
    });
  }

  buscarEventos(): void {
    this.service.findAllEventos().subscribe(res => {
      this.eventos = res;
    });
  }

}
