import { Router } from 'express';
import knex from './knex';
import { EventoCreate } from './model/evento-create';

const eventRoutes = Router();

eventRoutes.post('/', async (request, response) => {
    const body: EventoCreate = request.body;
    const result = await knex.raw(`
    insert into evento (id_organizador, nome, descricao, data_inicio, data_fim, local, preco, qtd_vagas, data_inicio_inscricao, data_fim_inscricao)
        values (${body.id_organizador}, ${body.nome}, ${body.descricao}, ${body.data_inicio}, ${body.data_fim}, ${body.local}, ${body.preco}, ${body.qtd_vagas}, ${body.data_inicio_inscricao}, ${body.data_fim_inscricao});
    `).then();
    return response.json(result.rows);
});

eventRoutes.put('/', async (request, response) => {
    const result = await knex.raw(`select * from evento`).then();
    return response.json(result.rows);
});

eventRoutes.delete('/', async (request, response) => {
    const id = request.body;
    const result = await knex.raw(`delete from evento where id = ${id}`).then();
    return response.json(result.rows);
});

eventRoutes.get('/', async (request, response) => {
    const result = await knex.raw(`select * from evento`).then();
    return response.json(result.rows);
});

eventRoutes.get('/available', async (request, response) => {
    const result = await knex.raw(`
    select id, nome, descricao, data_inicio, data_fim, local, preco, qtd_vagas, data_inicio_inscricao, data_fim_inscricao from evento
      where id_evento_pai is null and data_inicio_inscricao < now() and now() < data_fim_inscricao;
    `).then();
    return response.json(result.rows);
});

export default eventRoutes;