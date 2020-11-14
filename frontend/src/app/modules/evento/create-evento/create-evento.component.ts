import { AppService } from './../../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { Ministrante } from 'src/app/model/ministrante';
import { Evento } from 'src/app/model/evento';

@Component({
  selector: 'app-create-evento',
  templateUrl: './create-evento.component.html',
  styleUrls: ['./create-evento.component.scss']
})
export class CreateEventoComponent implements OnInit {

  ministrantes: Ministrante[];
  eventos: Evento[];

  constructor(
    private service: AppService
  ) { }

  ngOnInit(): void {
    this.service.findMinistrantes().subscribe(res => {
      this.ministrantes = res;
    });
    this.service.findAll().subscribe(res => {
      this.eventos = res;
    });
  }

}
