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

//#region [rgba (0,205,30,0.1)]



// Locais

const LOCAISDAO = require('./models/LOCAISDAO');

app.get('/inserirLocais', function (req, res) {

  res.sendFile(__dirname + '/views/locais/formLocais.html');

});

app.get('/procurarLocais', function (req, res) {
  var locais = new LOCAISDAO();
    locais.list(con, function (result) {
    res.render('locais/tabela.ejs', { locais: result });
  });

});


app.post('/salvarLocais', function (req, res) {
  var locais = new LOCAISDAO();
  locais.setID(req.body.ID);
  locais.setNOME(req.body.NOME);
  locais.setENDERECO(req.body.ENDERECO);

  if (req.body.acao == "Atualizar") {
    locais.setID(req.body.ID);
    var retorno = locais.update(con);
    res.sendFile(__dirname + '/views/locais/resultado.html');
  } else {
    if (req.body.acao == "excluir") {
      res.redirect("http://localhost:3000");
    } else {
      var retorno = locais.create(con);
      res.sendFile(__dirname + '/views/locais/resultado.html');
    }
  }

});

app.get('/excluirLocais', function (req, res) {
  var locais = new LOCAISDAO();
  locais.setID(req.query.ID);

  var retorno = locais.delete(con);

  res.sendFile(__dirname + '/views/locais/resultado.html');


});

app.get('/atualizarLocais', function (req, res) {
  var locais = new LOCAISDAO();
  locais.setID(req.query.ID);

  locais.buscarporID(con, function (result) {
    res.render('locais/form.ejs', { locais: result });

  });

});

//#endregion


// feedback

const FEEDBACKDAO = require('./models/FEEDBACKDAO');

app.get('/inserirFeedback', function (req, res) {

  res.sendFile(__dirname + '/views/feedback/formFeedback.html');

});

app.get('/procurarFeedback', function (req, res) {
  var feedback = new FEEDBACKDAO();
    feedback.list(con, function (result) {
    res.render('feedback/tabela.ejs', { feedback: result });
  });

});


app.post('/salvarFeedback', function (req, res) {
  var feedback = new FEEDBACKDAO();
  feedback.setID(req.body.ID);
  feedback.setNOME(req.body.NOME);
  feedback.setEMAIL(req.body.EMAIL);
  feedback.setMENSAGEM(req.body.MENSAGEM);

  if (req.body.acao == "Atualizar") {
    feedback.setID(req.body.ID);
    var retorno = feedback.update(con);
    res.sendFile(__dirname + '/views/feedback/resultado.html');
  } else {
    if (req.body.acao == "excluir") {
      res.redirect("http://localhost:3000");
    } else {
      var retorno = feedback.create(con);
      res.sendFile(__dirname + '/views/feedback/resultado.html');
    }
  }

});

app.get('/excluirFeedback', function (req, res) {
  var feedback = new FEEDBACKDAO();
  feedback.setID(req.query.ID);

  var retorno = feedback.delete(con);

  res.sendFile(__dirname + '/views/feedback/resultado.html');


});

app.get('/atualizarFeedback', function (req, res) {
  var feedback = new FEEDBACKDAO();
  feedback.setID(req.query.ID);

  feedback.buscarporID(con, function (result) {
    res.render('feedback/form.ejs', { feedback: result });

  });

});