-- drop table ministrante_evento;
-- drop table participante_evento;
-- drop table usuario;
-- drop table evento;
-- drop table ministrante;

create role administrador with login superuser password '4dm1n157r4d0r';
create role organizador with login password '0rg4n1z4d0r';
create role participante with login password 'p4r71c1p4n73';

create database uesc_eventos with owner = administrador;

-- --------------------------------------------------------

create table usuario (
	id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	nome varchar(255) NOT NULL,
	email varchar(255) unique NOT NULL,
	senha varchar(255),
	tipo_usuario char(1) NOT NULL,
	cpf char(11) unique NOT NULL
);

create table ministrante (
	id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	nome varchar(255) NOT NULL,
	email varchar(255) unique NOT NULL,
	formacao text NOT NULL
);

create table evento (
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
);

create table ministrante_evento (
	id_ministrante integer REFERENCES ministrante(id) NOT NULL,
	id_evento integer REFERENCES evento(id) NOT NULL,
	PRIMARY KEY(id_ministrante, id_evento)
);

create table participante_evento (
	id_participante integer REFERENCES usuario(id) NOT NULL,
	id_evento integer REFERENCES evento(id) NOT NULL,
	PRIMARY KEY(id_participante, id_evento)
);

grant insert on table usuario to participante;
grant insert, select, delete on table participante_evento to participante;
grant insert, select, delete on table participante_evento to organizador;
grant insert, select, update, delete on table ministrante to organizador;
grant insert, select, delete on table ministrante_evento to organizador;
grant insert, select, update, delete on table evento to organizador;