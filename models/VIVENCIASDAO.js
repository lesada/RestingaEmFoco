module.exports = class locaisDAO {

    constructor() {
        this.ID = 0;
        this.NOME = "";
        this.VIVENCIA = "";
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

    getENDERECO() {
        return this.EMAIL;
    }

    setVIVENCIA(M) {
        this.VIVENCIA = M;
    }

    getVIVENCIA() {
        return this.VIVENCIA;
    }

    create(connection) {
        var sql = "insert into VIVENCIAS (ID, NOME, VIVENCIA) values (?, ?, ?)";

        connection.query(sql, [this.ID, this.NOME, this.VIVENCIA], function (err, result) {
            if (err) throw err;
        });

    }

    list(connection, callback) {
        var sql = "SELECT * FROM VIVENCIAS";

        connection.query(sql, function (err, result) {
            if (err) throw err;
            return callback(result);

        });

    }

    delete(connection) {
        var sql = "delete from VIVENCIAS where ID = ?";

        connection.query(sql, [this.ID], function (err, result) {
            if (err) throw err;
        });
    }

    buscarPorID(connection, callback) {
        var sql = "SELECT * FROM VIVENCIAS WHERE ID = ?";

        connection.query(sql, [this.ID], function (err, result) {
            if (err) throw err;
            return callback(result);

        });
    }

    update(connection) {
        var sql = "UPDATE VIVENCIAS SET NOME = ?, VIVENCIA = ? WHERE ID = ?";

        connection.query(sql, [this.NOME, this.VIVENCIA, this.ID], function (err, result) {
            if (err) throw err;

        });
    }
}
