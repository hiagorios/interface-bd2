import { AppService } from '../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/model/evento';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  eventos: Evento[] = [];

  constructor(
    private service: AppService
  ) { }

  ngOnInit(): void {
    this.service.findAllEventosDisponiveis().subscribe(res => {
      this.eventos = res;
    });
  }

}
