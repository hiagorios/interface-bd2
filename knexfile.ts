require('ts-node/register');

module.exports = {
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
  },
  timezone: 'UTC'
};
