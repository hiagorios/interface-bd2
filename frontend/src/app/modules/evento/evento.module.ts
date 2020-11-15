import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl } from 'ng-pick-datetime';
import { DatePickerIntl } from 'src/app/utils/DatePickerIntl';
import { CreateEventoComponent } from './create-evento/create-evento.component';
import { EventoListComponent } from './evento-list/evento-list.component';
import { UpdateEventoComponent } from './update-evento/update-evento.component';

const routes: Routes = [
  {path: '', component: EventoListComponent},
  {path: 'new', component: CreateEventoComponent},
  {path: 'edit/:id', component: CreateEventoComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  declarations: [EventoListComponent, CreateEventoComponent, UpdateEventoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    { provide: OwlDateTimeIntl, useClass: DatePickerIntl }
  ]
})
export class EventoModule { }
