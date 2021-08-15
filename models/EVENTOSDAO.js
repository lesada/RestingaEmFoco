module.exports = class EVENTOSDAO {

constructor() {
  this.ID = 0;
  this.LAT = "";
  this.LNG = "";
  this.NOME = "";
  this.SOBRE = ""; 
  this.DATAE = ""; 
  this.ABERTURA = ""; 
  this.CONCLUSAO = ""; 

}

setID(z) {
  this.ID = z; 
}

getID() {
  return this.ID;
}

setLAT(l) {
  this.LAT = l; 
}

getLAT() {
  return this.LAT;
}

setLNG(g) {
  this.LNG = g; 
}

getLNG() {
  return this.LNG;
}


setNOME(n) {
  this.NOME = n; 
}

getNOME() {
  return this.NOME;
}

setSOBRE(s) {
  this.SOBRE = s; 
}

getSOBRE() {
  return this.SOBRE;
}


setDATAE(i) {
  this.DATAE = i; 
}

getDATAE() {
  return this.DATAE;
}

setABERTURA(a) {
  this.ABERTURA = a; 
}

getABERTURA() {
  return this.ABERTURA;
}

setCONCLUSAO(c) {
  this.CONCLUSAO = c; 
}

getCONCLUSAO() {
  return this.CONCLUSAO;
}

create(connection) {
  var sql = "INSERT INTO EVENTOS (LAT, LNG, NOME, SOBRE,  DATAE, ABERTURA, CONCLUSAO) VALUES(?, ?, ?, ?, ?, ?, ?)";

  connection.query(sql, [this.LAT, this.LNG, this.NOME, this.SOBRE, this.DATAE, this.ABERTURA, this.CONCLUSAO],
    function (err, result) {
      if (err) throw err;
      });
    }
     list(connection, callback) {
       var sql ="SELECT * FROM EVENTOS";
   
       connection.query(sql, function (err, result) {
           if (err) throw err;
           return callback(result); 
       });
   
     }

     delete (connection) {
       var sql = "DELETE FROM EVENTOS WHERE ID = ?";

       connection.query(sql, [this.ID], function (err, results)
       {
        if (err) throw err;
       }); 
     }

     buscarPorId (connection, callback) {
      var sql = "DELETE FROM EVENTOS WHERE ID = ?";

      connection.query(sql, [this.ID], function (err, result)
      {
       if (err) throw err;
       return callback (result);
      }); 
    }

    update (connection) {
      var sql = "UPDATE EVENTOS SET LAT = ?, LNG = ?, NOME = ?, SOBRE = ?, DATAE = ?, ABERTURA = ?, CONCLUSAO = ? WHERE ID = ?";

      connection.query(sql, [this.LAT, this.LNG, this.NOME, this.SOBRE, this.DATAE, this.ABERTURA, this.CONCLUSAO, this.ID], function (err, result) {
        if (err) throw err;
      });
    }
   
   }

