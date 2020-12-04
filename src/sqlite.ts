const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('src/db/db.db')

interface Amigo{
  nome:string,
  nome_mae:string,
  telefone:string,
  local_conhecido:string
}

module.exports = {
  
  getCaixaList: function(callback:any){
      db.all("SELECT * FROM caixa", function(err:any, res:any){
        callback(res);
      });
  },
  addCor: function(corName:string, callback:any){

      db.run("INSERT INTO caixa VALUES ($cor)", {
        $cor: corName
      }, function(){
        callback();
      });
    },
  deleteCor: function(corName:string, callback:any){
    db.run("DELETE FROM caixa WHERE cor = ($cor)", {
      $cor: corName
    }, function(){
      callback();
    });
  },

  addAmigo: function(amigo:Amigo, callback:any){
    db.run("INSERT INTO amigo VALUES ($nome, $nome_mae, $telefone, $local_conhecido)", {
      $nome : amigo.nome,
      $nome_mae : amigo.nome_mae,
      $telefone : amigo.telefone,
      $local_conhecido : amigo.local_conhecido
    }, function(){
      callback();
    });
  },
  getAmigo: function(callback:any){
    db.all("SELECT * FROM amigo", function(err:any, res:any){
      callback(res);
    });
},

}