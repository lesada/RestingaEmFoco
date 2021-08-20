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
app.use(express.static(__dirname + '/views'));

// Home

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/home.html');
});

// Eventos

const EVENTOSDAO = require('./models/EVENTOSDAO');

app.get('/inserirEventos', function (req, res) {
  res.sendFile(__dirname + '/views/eventos/cadastroEventos.html');
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


app.get('/procurarEventos', function (req, res) {
  var eventos = new EVENTOSDAO();
  eventos.list(con, function (result) {
    res.render('eventos/lista.ejs', { eventos: result });
  });

});


app.get('/excluirEventos', function (req, res) {
  var eventos = new EVENTOSDAO();
  eventos.setID(req.query.id);

  var retorno = eventos.delete(con);

  res.sendFile(__dirname + '/views/eventos/procurarEventos.html')
});

app.get('/atualizarEventos', function (req, res) {
  var eventos = new EVENTOSDAO();
  eventos.setID(req.query.id);

  eventos.buscarPorId(con, function (result) {
    res.render('eventos/form.ejs', { eventos: result });
  })

});

// Organizadores

const ORGANIZADORESDAO = require('./models/ORGANIZADORESDAO');


app.get('/inserirOrganizadores', function (req, res) {
  res.sendFile(__dirname + '/views/organizadores/formOrganizadores.html');
});


app.get('/procurarOrganizadores', function (req, res) {
  var organizadores = new ORGANIZADORESDAO();
  organizadores.list(con, function (result) {
    res.render('organizadores/lista.ejs', { organizadores: result });
  });

});


app.post('/salvarOrganizadores', function (req, res) {
  var organizadores = new ORGANIZADORESDAO();
  organizadores.setID(req.body.ID);
  organizadores.setNOME(req.body.NOME);
  organizadores.setSOBRENOME(req.body.SOBRENOME);
  organizadores.setCPF(req.body.CPF);
  organizadores.setENDERECO(req.body.ENDERECO);
  organizadores.setTELEFONE(req.body.TELEFONE);

  if (req.body.acao == "Atualizar") {
    organizadores.setID(req.body.ID);
    var retorno = organizadores.update(con);
    res.sendFile(__dirname + '/views/organizadores/resultado.html');
  } else {
    if (req.body.acao == "Cancelar") {
      res.redirect("http://localhost:3000");
    } else {
      var retorno = organizadores.create(con);
      res.sendFile(__dirname + '/views/organizadores/resultado.html');
    }
  }

});

app.get('/excluirOrganizadores', function (req, res) {
  var organizadores = new ORGANIZADORESDAO();
  organizadores.setID(req.query.id);

  var retorno = organizadores.delete(con);
  res.sendFile(__dirname + '/views/organizadores/resultado.html');
});

app.get('/atualizarOrganizadores', function (req, res) {
  var organizadores = new ORGANIZADORESDAO();
  organizadores.setID(req.query.id);

  organizadores.buscarPorID(con, function (result) {
    res.render('organizadores/formOrganizadores.ejs', { organizadores: result });

  });

});

// Locais

const LOCAISDAO = require('./models/LOCAISDAO');

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

