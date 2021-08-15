create database IF NOT EXISTS RestingaEmFoco; 
use  RestingaEmFoco;


 CREATE TABLE IF NOT EXISTS EVENTOS (
	ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
	LAT TEXT,
	LNG TEXT,
	NOME TEXT,
	SOBRE TEXT,
	DATAE DATE,
	ABERTURA TEXT,
	CONCLUSAO TEXT,
    PRIMARY KEY (ID)
);

CREATE TABLE ORGANIZADORES 
(
ID INT AUTO_INCREMENT NOT NULL,
NOME varchar(15) not null,
SOBRENOME varchar(25) not null,
CPF varchar (15) not null,
ENDERECO varchar (20) not null,
TELEFONE varchar(14) not null,
primary key (id)
); 

CREATE TABLE IF NOT EXISTS LOCAIS (
	ID INT AUTO_INCREMENT,
    NOME TEXT,
    ENDERECO TEXT,
    PRIMARY KEY (ID)
    );
	


CREATE USER IF NOT EXISTS 'restinga'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';
GRANT ALL PRIVILEGES ON * . * TO 'restinga'@'localhost';
FLUSH PRIVILEGES;

USE RestingaEmFoco;
INSERT EVENTOS values(1,'-27.2114974','-49.6444793', 'Evento do IFRS', 'disajdiosajiodajs dsahdiusahdisua dsjaiojdsoai','1111-1111', 'teste', 'teste');

USE RestingaEmFoco;
INSERT ORGANIZADORES values(1, 'LAUREN', 'FERREIRA', '03626120000', 'RUA DAS PALMEIRAS', '');

USE RestingaEmFoco;
INSERT LOCAIS values(1, 'CECORES', 'RUA DAS PALMEIRAS');


SELECT * FROM EVENTOS;
SELECT * FROM ORGANIZADORES;
SELECT * FROM LOCAIS;

