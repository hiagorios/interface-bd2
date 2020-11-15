import { EventoCreate } from './../../frontend/src/app/model/evento-create';
import { Router } from 'express';
import knex from './knex';
import { Evento } from './model/evento';

const eventoRoutes = Router();

eventoRoutes.post('/', (request, response) => {
    const body: EventoCreate = request.body;
    knex.raw(`
    insert into evento (id_organizador, id_evento_pai, nome, descricao, data_inicio, data_fim,
        local, preco, qtd_vagas, data_inicio_inscricao, data_fim_inscricao)
        values (${body.id_organizador}, ${body.id_evento_pai}, '${body.nome}', '${body.descricao}',
        '${body.data_inicio}', '${body.data_fim}', '${body.local}', ${body.preco}, ${body.qtd_vagas},
        '${body.data_inicio_inscricao}', '${body.data_fim_inscricao}');
    `).then(res => {
        response.json(res);
    }).catch(error => {
        console.log(error);
    });
});

eventoRoutes.put('/', (request, response) => {
    const body: Evento = request.body;
    knex.raw(`
    update evento set id_organizador = ${body.id_organizador}, id_evento_pai = ${body.id_evento_pai},
        nome = '${body.nome}', descricao = '${body.descricao}', local = '${body.local}', qtd_vagas = ${body.qtd_vagas},
        data_inicio = '${body.data_inicio}', data_fim = '${body.data_fim}', preco = ${body.preco},
        data_inicio_inscricao = '${body.data_inicio_inscricao}', data_fim_inscricao = '${body.data_fim_inscricao}'
        where id = ${body.id};
    `).then(res => {
        response.json(res);
    }).catch(error => {
        console.log(error);
    });
});

eventoRoutes.delete('/:id', (request, response) => {
    const id = request.params.id;
    knex.raw(`delete from evento where id = ${id};`).then(res => {
        response.json(res);
    }).catch(error => {
        console.log(error);
    });
});

eventoRoutes.get('/', (request, response) => {
    knex.raw(`select * from evento;`).then(res => {
        response.json(res.rows);
    }).catch(error => {
        console.log(error);
    });
});

eventoRoutes.get('/id/:id', (request, response) => {
    const id = request.params.id;
    knex.raw(`select * from evento where id = ${id};`).then(res => {
        response.json(res.rows[0]);
    }).catch(error => {
        console.log(error);
    });
});

eventoRoutes.get('/idNot/:id', (request, response) => {
    const id = request.params.id;
    knex.raw(`select * from evento where id <> ${id};`).then(res => {
        response.json(res.rows);
    }).catch(error => {
        console.log(error);
    });
});

eventoRoutes.get('/disponiveis', (request, response) => {
    knex.raw(`
    select id, nome, descricao, data_inicio, data_fim, local, preco, qtd_vagas, data_inicio_inscricao, data_fim_inscricao from evento
      where id_evento_pai is null and data_inicio_inscricao < now() and now() < data_fim_inscricao;
    `).then(res => {
        response.json(res.rows);
    }).catch(error => {
        console.log(error);
    });
});

export default eventoRoutes;