module.exports = class ORGANIZADORESDAO {

  constructor() {
    this.ID = 0;
    this.NOME = "";
    this.SOBRENOME = "";
    this.CPF = "";
    this.ENDERECO = "";
    this.TELEFONE = "";

  }

  setID(i) {
    this.ID = i;
  }

  getID() {
    return this.ID;
  }

  setNOME(n) {
    this.NOME = n;
  }

  getNOME() {
    return this.NOME;
  }

  setSOBRENOME(s) {
    this.SOBRENOME = s;
  }

  getSOBRENOME() {
    return this.SOBRENOME;
  }

  setCPF(c) {

    this.CPF = c;
  }

  getCPF() {
    return this.CPF;
  }


  setENDERECO(t) {

    this.ENDERECO = t;
  }

  getENDERECO() {
    return this.ENDERECO;
  }

  setTELEFONE(t) {

    this.TELEFONE = t;
  }

  getTELEFONE() {
    return this.TELEFONE;
  }

  create(connection) {
    var sql = "INSERT INTO ORGANIZADORES (ID, NOME, SOBRENOME, CPF, ENDERECO, TELEFONE) VALUES(?, ?, ?, ?, ?, ?)";

    connection.query(sql, [this.ID, this.NOME, this.SOBRENOME, this.CPF, this.ENDERECO, this.TELEFONE],
      function (err, result) {
        if (err) throw err;
      });
  }
  list(connection, callback) {
    var sql = "SELECT * FROM ORGANIZADORES";

    connection.query(sql, function (err, result) {
      if (err) throw err;
      return callback(result);
    });

  }

  delete(connection) {
    var sql = "DELETE FROM ORGANIZADORES WHERE ID = ?";

    connection.query(sql, [this.ID], function (err, result) {
      if (err) throw err;

    });
  }

  buscarPorID(connection, callback) {
    var sql = "SELECT * FROM ORGANIZADORES WHERE ID = ?";

    connection.query(sql, [this.ID], function (err, result) {
      if (err) throw err;
      return callback(result);

    });
  }


  update(connection) {
    var sql = "UPDATE ORGANIZADORES SET NOME = ?, SOBRENOME = ?, CPF = ?, ENDERECO = ?, TELEFONE = ? WHERE ID = ?";

    connection.query(sql, [this.NOME, this.SOBRENOME, this.CPF, this.ENDERECO, this.TELEFONE, this.ID], function (err, result) {
      if (err) throw err;
    });

  }
}
