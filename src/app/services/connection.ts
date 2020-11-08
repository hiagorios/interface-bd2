import * as knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '123456',
    database : 'teste'
  },
  pool: {
    min: 2,
    max: 10
  }
});

export default db;
