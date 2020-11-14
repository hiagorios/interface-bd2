import { Router } from 'express';
import knex from './knex';

const usuarioRoutes = Router();

usuarioRoutes.get('/:id', async (request, response) => {
    const usuarioId = request.params.id;
    const result = await knex.raw(`select * from usuario where id = ${usuarioId}`).then();
    return response.json(result.rows);
});

export default usuarioRoutes;