use timetomovie;

create table local(
	id_local int not null auto_increment primary key,
    uf varchar(2),
    estado varchar(50)
);

create table usuario(
	id_usuario int not null auto_increment primary key,
    nome varchar(50),
    email varchar(100),
    senha varchar(1000),
    id_local int,
    foreign key (id_local) references local(id_local)
);

create table semana(
	id_semana int not null auto_increment primary key,
    dia varchar(20),
    id_usuario int,
    foreign key (id_usuario) references usuario(id_usuario)
);

create table horario(
	id_horario int not null auto_increment primary key,
    horario varchar(20),
    id_semana int,
    foreign key (id_semana) references semana(id_semana)
);

