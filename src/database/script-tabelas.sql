-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE livraria;

USE livraria;

create table genero (
idgenero int primary key auto_increment,
nome varchar(45));

create table livro (
idLivro int primary key auto_increment,
nomeLivro  varchar(45),
nomeAutor  varchar(45),
precoCompra  decimal(9,2),
precoVenda  decimal(9,2),
qtdEstoque  int,
fk_genero int,
foreign key (fk_genero) references genero(idgenero));


insert into genero (nome) values ('romance');
insert into genero (nome) values ('horror');
insert into genero (nome) values ('fantasia');
insert into genero (nome) values ('poesia');