create role administrador with login superuser password '4dm1n157r4d0r';
create role organizador with login password '0rg4n1z4d0r';
create role participante with login password 'p4r71c1p4n73';

create database uesc_eventos with owner = administrador;
----------------------------------------------------------
SET TIMEZONE TO 'America/Bahia';

-- Ajustamos a generalização dos tipos de usuário, definindo como Categoria
-- e replicando as permissões dos usuários de menor nível para os usuário de maior nível
-- Também ajustamos o trigger before insert evento, para verificar se o usuário é organizador ou administrador

create table usuario (
	id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	nome varchar(255) NOT NULL,
	email varchar(255) unique NOT NULL,
	senha varchar(255) NOT NULL,
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
	descricao text,
	data_inicio timestamp with time zone NOT NULL,
	data_fim timestamp with time zone NOT NULL,
	local varchar(255) NOT NULL,
	preco float(2),
	qtd_vagas integer NOT NULL,
	data_inicio_inscricao timestamp with time zone NOT NULL,
	data_fim_inscricao timestamp with time zone NOT NULL
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

-- PARTICIPANTE
grant insert on table usuario to participante;
grant insert, select, delete on table participante_evento to participante;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO participante;

-- ORGANIZADOR
grant insert, select on table usuario to organizador;
grant insert, select, delete on table participante_evento to organizador;
grant insert, select, update, delete on table ministrante to organizador;
grant insert, select, delete on table ministrante_evento to organizador;
grant insert, select, update, delete on table evento to organizador;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO organizador;