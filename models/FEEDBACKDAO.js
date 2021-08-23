module.exports = class locaisDAO {

    constructor() {
        this.ID = 0;
        this.NOME = "";
        this.EMAIL = "";
        this.MENSAGEM = "";
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

    setEMAIL(E) {
        this.EMAIL = E;
    }

    getENDERECO() {
        return this.EMAIL;
    }

    setMENSAGEM(M) {
        this.MENSAGEM = M;
    }

    getMENSAGEM() {
        return this.MENSAGEM;
    }

    create(connection) {
        var sql = "insert into FEEDBACK (ID, NOME, EMAIL, MENSAGEM) values (?, ?, ?, ?)";

        connection.query(sql, [this.ID, this.NOME, this.EMAIL, this.MENSAGEM], function (err, result) {
            if (err) throw err;
        });

    }

    list(connection, callback) {
        var sql = "SELECT * FROM FEEDBACK";

        connection.query(sql, function (err, result) {
            if (err) throw err;
            return callback(result);

        });

    }

    delete(connection) {
        var sql = "delete from FEEDBACK where ID = ?";

        connection.query(sql, [this.ID], function (err, result) {
            if (err) throw err;
        });
    }

    buscarPorID(connection, callback) {
        var sql = "SELECT * FROM FEEDBACK WHERE ID = ?";

        connection.query(sql, [this.ID], function (err, result) {
            if (err) throw err;
            return callback(result);

        });
    }

    update(connection) {
        var sql = "UPDATE FEEDBACK SET NOME = ?, EMAIL = ?, MENSAGEM = ? WHERE ID = ?";

        connection.query(sql, [this.NOME, this.EMAIL, this.MENSAGEM, this.ID], function (err, result) {
            if (err) throw err;

        });
    }
}
