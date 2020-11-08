insert into usuario (nome, email, senha, tipo_usuario, cpf) values ('Hiago', 'hiago@gmail.com', '123456', 'Administrador', '62309507075');
insert into usuario (nome, email, senha, tipo_usuario, cpf) values ('João', 'joao@gmail.com', '123456', 'Organizador', '43569733050');
insert into usuario (nome, email, senha, tipo_usuario, cpf) values ('Tricia', 'tricia@gmail.com', '123456', 'Participante', '87721664012');

insert into ministrante (nome, email, formacao) values ('Fabio Alonso', 'fabio@gmail.com', 'Soldador de carro tunado');
insert into ministrante (nome, email, formacao) values ('Igo Reis', 'igo@gmail.com', 'Graduado em Ciência da Computação, Especialista em Formatar PC');
insert into ministrante (nome, email, formacao) values ('Martinho da Vila', 'martinho@gmail.com', 'Músico, compositor, sonoplasta, entusiasta em alimentar pombo na praça');

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