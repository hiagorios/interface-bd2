const queries = {
  creates: {
    roles:
      `create role administrador with login superuser password '4dm1n157r4d0r';
    create role organizador with login password '0rg4n1z4d0r';
    create role participante with login password 'p4r71c1p4n73';`,
    database: 'create database uesc_eventos with owner = administrador;',
    usuario: `create table usuario (
      id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      nome varchar(255) NOT NULL,
      email varchar(255) unique NOT NULL,
      senha varchar(255),
      tipo_usuario varchar(255) NOT NULL,
      cpf char(11) unique NOT NULL
    );`,
    ministrante: `create table ministrante (
      id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      nome varchar(255) NOT NULL,
      email varchar(255) unique NOT NULL,
      formacao text NOT NULL
    );`,
    evento: `create table evento (
      id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      id_evento_pai integer REFERENCES evento(id),
      id_organizador integer REFERENCES usuario(id) NOT NULL,
      nome varchar(255) NOT NULL,
      descricao text NOT NULL,
      data_inicio timestamp NOT NULL,
      data_fim timestamp NOT NULL,
      local varchar(255) NOT NULL,
      preco float(2) NOT NULL,
      qtd_vagas integer NOT NULL,
      data_inicio_inscricao timestamp,
      data_fim_inscricao timestamp
    );`,
    ministranteEvento: `create table ministrante_evento (
      id_ministrante integer REFERENCES ministrante(id) NOT NULL,
      id_evento integer REFERENCES evento(id) NOT NULL,
      PRIMARY KEY(id_ministrante, id_evento)
    );`,
    participanteEvento: `create table participante_evento (
      id_participante integer REFERENCES usuario(id) NOT NULL,
      id_evento integer REFERENCES evento(id) NOT NULL,
      PRIMARY KEY(id_participante, id_evento)
    );`,
    grants: `grant create on table usuario to participante;
            grant create, select, delete on table participante_evento to participante;
            grant create, select, update, delete on table ministrante to organizador;
            grant create, select, delete on table ministrante_evento to organizador;
            grant create, select, update, delete on table evento to organizador;`,
    triggers: {
      deleteEvento: `CREATE TRIGGER ...`
      // ao deletar evento, remover os ministrante_evento e participante_evento associados
      // acho que nisso aq ja vai trigger, function e cursor
    }
  },
  inserts: {
    usuarios: `
    insert into usuario (nome, email, senha, tipo_usuario, cpf) values ('Hiago', 'hiago@gmail.com', '123456', 'Administrador', '62309507075');
    insert into usuario (nome, email, senha, tipo_usuario, cpf) values ('João', 'joao@gmail.com', '123456', 'Organizador', '43569733050');
    insert into usuario (nome, email, senha, tipo_usuario, cpf) values ('Tricia', 'tricia@gmail.com', '123456', 'Participante', '87721664012');`,
    ministrantes: `
    insert into ministrante (nome, email, formacao) values ('Fabio Alonso', 'fabio@gmail.com', 'Soldador de carro tunado');
    insert into ministrante (nome, email, formacao) values ('Igo Reis', 'igo@gmail.com', 'Graduado em Ciência da Computação, Especialista em Formatar PC');
    insert into ministrante (nome, email, formacao) values ('Martinho da Vila', 'martinho@gmail.com', 'Músico, compositor, sonoplasta, entusiasta em alimentar pombo na praça');`,
    eventos: `
      insert into evento (id_organizador, nome, descricao, data_inicio, data_fim, local, preco, qtd_vagas, data_inicio_inscricao, data_fim_inscricao)
        values (2, 'Sinform 2020', 'Semana da Informática UESC - 2020', timestamp '2020-11-02 17:00', timestamp '2020-11-02 20:00',
        'Pav. Jorge Amado', 0, 400, timestamp '2020-10-20 00:00', timestamp '2020-10-31 23:59');
      insert into ministrante_evento values (1, 1);
      insert into participante_evento values (1, 1);
      insert into participante_evento values (2, 1);
      insert into participante_evento values (3, 1);

      insert into evento (id_organizador, id_evento_pai, nome, descricao, data_inicio, data_fim, local, preco, qtd_vagas, data_inicio_inscricao, data_fim_inscricao)
        values (2, 1, 'Oficina Tecnológica', 'Oficina de programação e inovação', timestamp '2020-11-02 18:30', timestamp '2020-11-02 19:40',
        'Pav. Jorge Amado', 0, 400, timestamp '2020-10-20 00:00', timestamp '2020-10-31 23:59');
      insert into ministrante_evento values (2, 2);
      insert into participante_evento values (1, 2);
      insert into participante_evento values (2, 2);

      insert into evento (id_organizador, nome, descricao, data_inicio, data_fim, local, preco, qtd_vagas, data_inicio_inscricao, data_fim_inscricao)
        values (2, 'Lê+', 'Palestra: Literatura Contemporânea', timestamp '2020-11-10 13:30', timestamp '2020-11-10 15:00',
            'Céu', 0, 150, timestamp '2020-11-01 00:00', timestamp '2020-11-10 08:00');
      insert into ministrante_evento values (1, 3);
      insert into participante_evento values (1, 3);
      insert into participante_evento values (2, 3);
      insert into participante_evento values (3, 3);
      `
  },
  evento: {
    create: '', // talvez n de pra ficar aq pq dos parametros
    update: '', // talvez n de pra ficar aq pq dos parametros
    delete: 'DELETE FROM evento where id = ', // aq da pra adicionar o id la no service
    findAvailable: `
      select id, nome, descricao, data_inicio, data_fim, local, preco, qtd_vagas, data_inicio_inscricao, data_fim_inscricao from evento
      where id_evento_pai is null and data_inicio_inscricao < now() and now() < data_fim_inscricao;`,
    all: 'SELECT * from evento;'
  }
};

export default queries;
