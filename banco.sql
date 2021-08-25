create database IF NOT EXISTS RestingaEmFoco; 
use  RestingaEmFoco;


 CREATE TABLE IF NOT EXISTS EVENTOS (
	ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
	LAT TEXT,
	LNG TEXT,
	NOME TEXT,
	SOBRE TEXT,
	DATAE TEXT,
	ABERTURA TEXT,
	CONCLUSAO TEXT,
    PRIMARY KEY (ID)
);

CREATE TABLE ORGANIZADORES 
(
	ID INT AUTO_INCREMENT NOT NULL,
	NOME TEXT,
	SOBRENOME TEXT,
	CPF TEXT,
	ENDERECO TEXT,
	TELEFONE TEXT,
	primary key (ID)
); 

CREATE TABLE IF NOT EXISTS LOCAIS (
    ID INT AUTO_INCREMENT,
    NOME TEXT,
    ENDERECO TEXT,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS FEEDBACK (
    ID INT AUTO_INCREMENT,
    NOME TEXT,
    EMAIL TEXT,
    MENSAGEM TEXT,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS VIVENCIAS (
    ID INT AUTO_INCREMENT,
    NOME TEXT,
    VIVENCIA TEXT,
    PRIMARY KEY (ID)
);
	


CREATE USER IF NOT EXISTS 'restinga'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';
GRANT ALL PRIVILEGES ON * . * TO 'restinga'@'localhost';

USE RestingaEmFoco;
INSERT EVENTOS values(1,'-27.2114974','-49.6444793', 'Evento do IFRS', 'É um evento padrão para a comunidade', '17/01/2022', '18:00', '19:00');

USE RestingaEmFoco;
INSERT ORGANIZADORES values(1, 'LAUREN', 'FERREIRA', '03626120000', 'RUA DAS PALMEIRAS', '');

USE RestingaEmFoco;
INSERT LOCAIS values(1, 'CECORES', 'RUA DAS PALMEIRAS');

USE RestingaEmFoco;
INSERT FEEDBACK values(1, 'LAUREN', 'LLFDSILVA@RESTINGA.IFRS.EDU.BR', 'TEXTO PADRAO');


SELECT * FROM EVENTOS;
SELECT * FROM ORGANIZADORES;
SELECT * FROM LOCAIS;
SELECT * FROM FEEDBACK;
