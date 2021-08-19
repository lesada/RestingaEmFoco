// Geral

const express = require('express');
const app = express();
app.listen(3000, function () {
  console.log("Servidor no ar - Porta: 3000!")
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "restinga",
  password: "12345678",
  database: "RestingaEmFoco"

});

con.connect(function (err) {
  if (err) throw err;
  console.log("Banco de dados conectado!");
});

// Para funcionar os CSS

app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/views'));

// Home

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/home.html');
});

// Eventos

const EVENTOSDAO = require('./models/EVENTOSDAO');
const ORGANIZADORESDAO = require('./models/ORGANIZADORESDAO');
const LOCAISDAO = require('./models/LOCAISDAO');

app.get('/inserirEventos', function (req, res) {
  res.sendFile(__dirname + '/views/eventos/cadastroEventos.html');
});


app.get('/procurarEventos', function (req, res) {
  var eventos = new EVENTOSDAO();
  eventos.list(con, function (result) {
    res.render('eventos/lista.ejs', { eventos: result });
  });

});


app.post('/salvarEventos', function (req, res) {
  var eventos = new EVENTOSDAO();
  eventos.setLAT(req.body.LAT);
  eventos.setLNG(req.body.LNG);
  eventos.setNOME(req.body.NOME);
  eventos.setSOBRE(req.body.SOBRE);
  eventos.setDATAE(req.body.DATAE);
  eventos.setABERTURA(req.body.ABERTURA);
  eventos.setCONCLUSAO(req.body.CONCLUSAO);

  if (req.body.acao == "Atualizar") {
    eventos.setID(req.body.ID);
    var retorno = eventos.update(con);
    res.sendFile(__dirname + '/views/eventos/procurarEventos.html')
  } else {
    if (req.body.acao == "Cancelar") {
      res.redirect("http://localhost:3000");

    } else {
      var retorno = eventos.create(con);
      res.sendFile(__dirname + '/views/eventos/procurarEventos.html')
    }
  }

});

app.get('/excluirEVENTOS', function (req, res) {
  var EVENTOS = new EVENTOSDAO();
  EVENTOS.setID(req.query.id);

  var retorno = EVENTOS.delete(con);

  res.sendFile(__dirname + '/views/EVENTOS/procurarEventos.html')
});

app.get('/atualizarEVENTOS', function (req, res) {
  var EVENTOS = new EVENTOSDAO();
  EVENTOS.setID(req.query.id);

  EVENTOS.buscarPorId(con, function (result) {
    res.render('/EVENTOS/form.ejs', { EVENTOS: result });
  })

});



/*comeca os ORGANIZADORES. Renomear tudo com organizador e colocar na pasta views/organizadores*/

app.get('/inserirORGANIZADORES', function (req, res) {
  res.sendFile(__dirname + '/views/ORGANIZADORES/form_cadastro.html');

});


app.post('/salvarORGANIZADORES', function (req, res) {
  var ORGANIZADORES = new ORGANIZADORESDAO();
  ORGANIZADORES.setID(req.body.ID);
  ORGANIZADORES.setNOME(req.body.NOME);
  ORGANIZADORES.setSOBRENOME(req.body.SOBRENOME);
  ORGANIZADORES.setCPF(req.body.CPF);
  ORGANIZADORES.setENDERECO(req.body.ENDERECO);
  ORGANIZADORES.setTELEFONE(req.body.TELEFONE);

  if (req.body.acao == "Atualizar") {
    ORGANIZADORES.setID(req.body.ID);
    var retorno = ORGANIZADORES.update(con);
    res.sendFile(__dirname + '/views/ORGANIZADORES/resultado.html');
  } else {
    if (req.body.acao == "Cancelar") {
      res.redirect("http://localhost:3000");
    } else {
      var retorno = ORGANIZADORES.create(con);
      res.sendFile(__dirname + '/views/ORGANIZADORES/resultado.html');
    }
  }

});

app.get('/excluirORGANIZADORES', function (req, res) {
  var ORGANIZADORES = new ORGANIZADORESDAO();
  ORGANIZADORES.setID(req.query.id);

  var retorno = ORGANIZADORES.delete(con);
  res.sendFile(__dirname + '/views/ORGANIZADORES/resultado.html');


});

app.get('/atualizarORGANIZADORES', function (req, res) {
  var ORGANIZADORES = new ORGANIZADORESDAO();
  ORGANIZADORES.setID(req.query.id);

  ORGANIZADORES.buscarPorID(con, function (result) {
    res.render('form_cadastro.ejs', { ORGANIZADORES: result });

  });

});

/*COMEÇA OS LOCAIS*/

app.get('/inserirLOCAIS', function (req, res) {

  res.sendFile(__dirname + '/views/LOCAIS/formlocais.html');

});


app.post('/salvarLOCAIS', function (req, res) {
  var LOCAIS = new locaisDAO();
  LOCAIS.setID(req.body.ID);
  LOCAIS.setNOME(req.body.NOME);
  LOCAIS.setENDERECO(req.body.ENDERECO);

  if (req.body.acao == "Atualizar") {
    LOCAIS.setID(req.body.ID);
    var retorno = LOCAIS.update(con);
    res.sendFile(__dirname + '/views/LOCAIS/resultado.html');
  } else {
    if (req.body.acao == "excluir") {
      res.redirect("http://localhost:3000");
    } else {
      var retorno = LOCAIS.create(con);
      res.sendFile(__dirname + '/views/LOCAIS/resultado.html');
    }
  }

});

app.get('/excluirLOCAIS', function (req, res) {
  var LOCAIS = new locaisDAO();
  LOCAIS.setID(req.query.ID);

  var retorno = LOCAIS.delete(con);

  res.sendFile(__dirname + '/views/LOCAIS/resultado.html');


});

app.get('/AtualizarLOCAIS', function (req, res) {
  var LOCAIS = new locaisDAO();
  LOCAIS.setID(req.query.ID);

  LOCAIS.buscarporID(con, function (result) {
    res.render('tabela.ejs', { LOCAIS: result });

  });

});

