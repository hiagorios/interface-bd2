import { Router } from 'express';
import knex from './knex';

const ministranteRoutes = Router();

ministranteRoutes.get('/', async (request, response) => {
    const result = await knex.raw(`select * from ministrante`).then();
    return response.json(result.rows);
});

ministranteRoutes.get('/evento/:id', async (request, response) => {
    const id = request.params.id;
    const result = await knex.raw(`
    select ministrante.id, ministrante.nome, ministrante.email, ministrante.formacao
    from ministrante inner join ministrante_evento on ministrante.id = ministrante_evento.id_ministrante
    where ministrante_evento.id_evento = ${id};
    `).then();
    return response.json(result.rows);
});

export default ministranteRoutes;