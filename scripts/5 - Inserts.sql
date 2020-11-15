insert into usuario (nome, email, senha, tipo_usuario, cpf) values ('Hiago', 'hiago@gmail.com', '123456', 'A', '62309507075');
insert into usuario (nome, email, senha, tipo_usuario, cpf) values ('Tricia', 'tricia@gmail.com', '123456', 'P', '87721664012');
insert into usuario (nome, email, senha, tipo_usuario, cpf) values ('João', 'joao@gmail.com', '123456', 'O', '43569733050');

insert into evento (id_organizador, nome, descricao, data_inicio, data_fim, local, preco, qtd_vagas, data_inicio_inscricao, data_fim_inscricao)
values (currval(pg_get_serial_sequence('usuario', 'id')), 'Sinform 2020', 'Semana da Informática UESC - 2020', NOW() + interval '3 days', NOW() + interval '10 days',
		'Pav. Jorge Amado', 0, 400, NOW() - interval '10 days', NOW() + interval '1 days');

insert into ministrante (nome, email, formacao) values ('Fabio Alonso', 'fabio@gmail.com', 'Soldador de carro tunado');

insert into ministrante_evento values (currval(pg_get_serial_sequence('ministrante', 'id')), currval(pg_get_serial_sequence('evento', 'id')));
insert into participante_evento values (currval(pg_get_serial_sequence('usuario', 'id')) - 2, currval(pg_get_serial_sequence('evento', 'id')));
insert into participante_evento values (currval(pg_get_serial_sequence('usuario', 'id')) - 1, currval(pg_get_serial_sequence('evento', 'id')));
insert into participante_evento values (currval(pg_get_serial_sequence('usuario', 'id')), currval(pg_get_serial_sequence('evento', 'id')));

insert into evento (id_organizador, id_evento_pai, nome, descricao, data_inicio, data_fim, local, preco, qtd_vagas, data_inicio_inscricao, data_fim_inscricao)
values (currval(pg_get_serial_sequence('usuario', 'id')), 1, 'Oficina Tecnológica', 'Oficina de programação e inovação', NOW() + interval '8 days', NOW() + interval '10 days',
		'Pav. Jorge Amado', 0, 400, NOW() - interval '10 days', NOW() + interval '1 days');
		
insert into ministrante (nome, email, formacao) values ('Igo Reis', 'igo@gmail.com', 'Graduado em Ciência da Computação, Especialista em Formatar PC');

insert into ministrante_evento values (currval(pg_get_serial_sequence('ministrante', 'id')), currval(pg_get_serial_sequence('evento', 'id')));
insert into participante_evento values (currval(pg_get_serial_sequence('usuario', 'id')) - 2, currval(pg_get_serial_sequence('evento', 'id')));
insert into participante_evento values (currval(pg_get_serial_sequence('usuario', 'id')), currval(pg_get_serial_sequence('evento', 'id')));

insert into evento (id_organizador, nome, descricao, data_inicio, data_fim, local, preco, qtd_vagas, data_inicio_inscricao, data_fim_inscricao)
values (currval(pg_get_serial_sequence('usuario', 'id')), 'Lê+', 'Palestra: Literatura Contemporânea', NOW() + interval '2 days', NOW() + interval '2 days',
		'Céu', 0, 150, NOW() - interval '3 days', NOW() + interval '1 days');
		
insert into ministrante (nome, email, formacao) values ('Leonardo Da Vinci', 'leonardo@gmail.com', 'Músico, compositor, sonoplasta, entusiasta em alimentar pombo na praça');

insert into ministrante_evento values (currval(pg_get_serial_sequence('ministrante', 'id')), currval(pg_get_serial_sequence('evento', 'id')));
insert into participante_evento values (currval(pg_get_serial_sequence('usuario', 'id')) - 2, currval(pg_get_serial_sequence('evento', 'id')));
insert into participante_evento values (currval(pg_get_serial_sequence('usuario', 'id')) - 1, currval(pg_get_serial_sequence('evento', 'id')));
insert into participante_evento values (currval(pg_get_serial_sequence('usuario', 'id')), currval(pg_get_serial_sequence('evento', 'id')));

insert into evento (id_organizador, nome, descricao, data_inicio, data_fim, local, preco, qtd_vagas, data_inicio_inscricao, data_fim_inscricao)
values (currval(pg_get_serial_sequence('usuario', 'id')), 'Assembleia DCET', 'Discussão sobre o atual estado do Mais Futuro', NOW() + interval '5 days', NOW() + interval '5 days',
		'Céu', 0, 150, NOW() - interval '1 days', NOW() + interval '4 days 12 hours');

insert into ministrante_evento values (currval(pg_get_serial_sequence('ministrante', 'id')), currval(pg_get_serial_sequence('evento', 'id')));
insert into participante_evento values (currval(pg_get_serial_sequence('usuario', 'id')) - 2, currval(pg_get_serial_sequence('evento', 'id')));
insert into participante_evento values (currval(pg_get_serial_sequence('usuario', 'id')) - 1, currval(pg_get_serial_sequence('evento', 'id')));
insert into participante_evento values (currval(pg_get_serial_sequence('usuario', 'id')), currval(pg_get_serial_sequence('evento', 'id')));