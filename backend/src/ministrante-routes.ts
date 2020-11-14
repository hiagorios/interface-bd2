import { Router } from 'express';
import knex from './knex';

const ministranteRoutes = Router();

ministranteRoutes.get('/', async (request, response) => {
    const result = await knex.raw(`select * from ministrante`).then();
    return response.json(result.rows);
});

export default ministranteRoutes;