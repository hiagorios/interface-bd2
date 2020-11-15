import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/model/evento';
import { Ministrante } from 'src/app/model/ministrante';
import { AppService } from './../../../services/app.service';

@Component({
  selector: 'app-create-evento',
  templateUrl: './create-evento.component.html',
  styleUrls: ['./create-evento.component.scss']
})
export class CreateEventoComponent implements OnInit {

  ministrantes: Ministrante[];
  eventos: Evento[];

  eventoForm: FormGroup;

  edicao = false;

  constructor(
    private service: AppService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.edicao = true;
        this.service.findEventoById(Number(id)).subscribe(evento => {
          this.service.findMinistranteByEventoID(evento.id).subscribe(ministrantes => {
            this.inicializarForm(evento, ministrantes);
          });
        });
      } else {
        this.inicializarForm();
      }
    });
    this.service.findMinistrantes().subscribe(res => {
      this.ministrantes = res;
    });
    this.service.findAllEventos().subscribe(res => {
      this.eventos = res;
    });
  }

  salvar(): void {
    if (this.eventoForm.valid) {
      // this.convertDates();
      console.log(this.eventoForm.value);
      if (this.edicao) {
        this.service.updateEvento(this.eventoForm.value).subscribe(res => {
          console.log('Evento atualizado!');
          this.router.navigate(['eventos']);
        });
      } else {
        this.service.createEvento(this.eventoForm.value).subscribe(res => {
          console.log('Evento criado!');
          this.router.navigate(['eventos']);
        });
      }
    } else {
      alert('Formulário incompleto!');
    }
  }

  // convertDates(): void {
  //   ['data_inicio', 'data_inicio_inscricao', 'data_fim', 'data_fim_inscricao'].forEach(control => {
  //     if (this.eventoForm.controls[control]) {
  //       const data = this.eventoForm.controls[control].value as Date;
  //       const userTimezoneOffset = data.getTimezoneOffset() * 60000;
  //       this.eventoForm.controls[control].setValue(new Date(data.getTime() - userTimezoneOffset));
  //     }
  //   });
  // }

  inicializarForm(evento?: Evento, ministrantes?: Ministrante[]): void {
    if (evento && ministrantes) {
      this.eventoForm = this.formBuilder.group({
        id: [evento.id],
        ids_ministrantes: [ministrantes.map(m => m.id), Validators.required],
        id_evento_pai: [evento.id_evento_pai],
        id_organizador: [evento.id_organizador, Validators.required],
        nome: [evento.nome, Validators.required],
        descricao: [evento.descricao, Validators.required],
        data_inicio: [new Date(evento.data_inicio), Validators.required],
        data_fim: [new Date(evento.data_fim), Validators.required],
        local: [evento.local, Validators.required],
        preco: [evento.preco, Validators.required],
        qtd_vagas: [evento.qtd_vagas, Validators.required],
        data_inicio_inscricao: [new Date(evento.data_inicio_inscricao), Validators.required],
        data_fim_inscricao: [new Date(evento.data_fim_inscricao), Validators.required]
      });
    } else {
      this.eventoForm = this.formBuilder.group({
        ids_ministrantes: [[], Validators.required],
        id_evento_pai: [null],
        id_organizador: [this.service.getUsuarioAutenticadoID(), Validators.required],
        nome: ['', Validators.required],
        descricao: ['', Validators.required],
        data_inicio: [null, Validators.required],
        data_fim: [null, Validators.required],
        local: ['', Validators.required],
        preco: ['', Validators.required],
        qtd_vagas: ['', Validators.required],
        data_inicio_inscricao: [null, Validators.required],
        data_fim_inscricao: [null, Validators.required]
      });
    }

  }

  getSelected(idMinistrante: number): boolean {
    if (this.eventoForm) {
      return (this.eventoForm.controls.ids_ministrantes.value as number[]).includes(idMinistrante);
    }
  }

}
