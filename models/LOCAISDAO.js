module.exports = class locaisDAO {

    constructor() {
        this.ID = 0;
        this.NOME = "";
        this.ENDERECO = "";
    }

    setID(I) {
        this.ID = I;
    }

    getID() {
        return this.ID;
    }

    setNOME(N) {
        this.NOME = N;
    }

    getNOME() {
        return this.NOME;
    }

    setENDERECO(E) {
        this.ENDERECO = E;
    }

    getENDERECO() {
        return this.ENDERECO;
    }

    create(connection) {
        var sql = "insert into LOCAIS (NOME, ENDERECO) values (?, ?)";

        connection.query(sql, [this.NOME, this.ENDERECO], function (err, result) {
            if (err) throw err;
        });

    }

    list(connection, callback) {
        var sql = "SELECT * FROM LOCAIS";

        connection.query(sql, function (err, result) {
            if (err) throw err;
            return callback(result);

        });

    }

    delete(connection) {
        var sql = "delete from LOCAIS where ID = ?";

        connection.query(sql, [this.ID], function (err, result) {
            if (err) throw err;
        });
    }

    buscarporID(connection, callback) {
        var sql = "SELECT * FROM LOCAIS WHERE ID = ?";

        connection.query(sql, [this.ID], function (err, result) {
            if (err) throw err;
            return callback(result);

        });
    }

    update(connection) {
        var sql = "UPDATE LOCAIS SET NOME = ?, ENDERECO = ? where ID = ?";

        connection.query(sql, [this.NOME, this.ENDERECO, this.ID], function (err, result) {
            if (err) throw err;

        });
    }

    update(connection) {
        var sql = "UPDATE EVENTOS SET LAT = ?, LNG = ?, NOME = ?, SOBRE = ?, DATAE = ?, ABERTURA = ?, CONCLUSAO = ? WHERE ID = ?";
    
        connection.query(sql, [this.LAT, this.LNG, this.NOME, this.SOBRE, this.DATAE, this.ABERTURA, this.CONCLUSAO, this.ID], function (err, result) {
          if (err) throw err;
        });
      }
}
