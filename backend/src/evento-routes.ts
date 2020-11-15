import { EventoCreate } from './../../frontend/src/app/model/evento-create';
import { Router } from 'express';
import knex from './knex';
import { Evento } from './model/evento';

const eventoRoutes = Router();

eventoRoutes.post('/', async (request, response) => {
    const body: EventoCreate = request.body;
    const resultEvento = await knex.raw(`
    insert into evento (id_organizador, nome, descricao, data_inicio, data_fim,
        local, preco, qtd_vagas, data_inicio_inscricao, data_fim_inscricao)
        values (${body.id_organizador}, '${body.nome}', '${body.descricao}', '${body.data_inicio}',
        '${body.data_fim}', '${body.local}', ${body.preco}, ${body.qtd_vagas},
        '${body.data_inicio_inscricao}', '${body.data_fim_inscricao}');
    `).then();
    return response.json([resultEvento]);
});

eventoRoutes.put('/', async (request, response) => {
    const body: Evento = request.body;
    const result = await knex.raw(`
    update evento set id_evento_pai = ${body.id_evento_pai}, id_organizador = ${body.id_organizador},
        nome = '${body.nome}', descricao = '${body.descricao}', local = '${body.local}', qtd_vagas = ${body.qtd_vagas},
        data_inicio = '${body.data_inicio}', data_fim = '${body.data_fim}', preco = ${body.preco},
        data_inicio_inscricao = '${body.data_inicio_inscricao}', data_fim_inscricao = '${body.data_fim_inscricao}'
        where id = ${body.id};
    `).then();
    return response.json(result);
});

eventoRoutes.delete('/:id', async (request, response) => {
    const id = request.params.id;
    const result = await knex.raw(`delete from evento where id = ${id};`).then();
    return response.json(result);
});

eventoRoutes.get('/', async (request, response) => {
    const result = await knex.raw(`select * from evento;`).then();
    return response.json(result.rows);
});

eventoRoutes.get('/id/:id', async (request, response) => {
    const id = request.params.id;
    const result = await knex.raw(`select * from evento where id = ${id};`).then();
    return response.json(result.rows[0]);
});

eventoRoutes.get('/disponiveis', async (request, response) => {
    const result = await knex.raw(`
    select id, nome, descricao, data_inicio, data_fim, local, preco, qtd_vagas, data_inicio_inscricao, data_fim_inscricao from evento
      where id_evento_pai is null and data_inicio_inscricao < now() and now() < data_fim_inscricao;
    `).then();
    return response.json(result.rows);
});

export default eventoRoutes;