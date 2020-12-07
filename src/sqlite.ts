const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('src/db/db.db')

interface Amigo{
  nome:string,
  nome_mae:string,
  telefone:string,
  local_conhecido:string
}
interface Revista{
  titulo:string,
  tema:string,
  volume:number,
  id_caixa_fk:number
}

module.exports = {
  
  getCaixaList: function(callback:any){
      db.all("SELECT * FROM caixa", function(err:any, res:any){
        callback(res);
      });
  },
  addCaixa: function(corName:string, callback:any){

      db.run(`INSERT INTO caixa VALUES (NULL,$cor)`, {
        $cor: corName
      }, function(){
        callback();
      });
    },
  deleteCaixa: function(corName:string, callback:any){
    db.run("DELETE FROM caixa WHERE cor = ($cor)", {
      $cor: corName
    }, function(){
      callback();
    });
  },

  addAmigo: function(amigo:Amigo, callback:any){
    db.run("INSERT INTO amigo VALUES (NULL,$nome, $nome_mae, $telefone, $local_conhecido)", {
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
  deleteAmigo: function(nome:string, callback:any){
    db.run("DELETE FROM amigo WHERE nome = ($nome)", {
      $nome: nome
    }, function(){
      callback();
    });
  },
  addRevista: function(revista:Revista, callback:any){
    db.run("INSERT INTO revista VALUES (NULL,$titulo, $tema, $volume, $id_caixa_fk)",{
      $titulo: revista.titulo,
      $tema: revista.tema,
      $volume: revista.volume,
      $id_caixa_fk: revista.id_caixa_fk
    }, function(){
      callback()
    })
  },
  getRevista: function(callback:any){
    db.all("SELECT * FROM revista", function(err:any, res:any){
      callback(res)
    }
    )
  },
  deleteRevista: function(id_revista:string, callback:any){
    db.run("DELETE FROM revista WHERE id_revista = ($id_revista)", {
      $id_revista: id_revista
    }, function(){
      callback();
    });
  },
  emprestaRevista: function(id_revista_fk:number, id_amigo_fk:number, callback:any){
    db.run("INSERT INTO Revista_emprestada VALUES ($id_revista_fk,$id_amigo_fk)",{
      $id_revista_fk:id_revista_fk,
      $id_amigo_fk:id_amigo_fk
    },function(){
      callback()
    })
  },
  getEmprestimos: function(id_amigo_fk:number, callback:any){
    db.all("SELECT * FROM Revista_emprestada WHERE id_amigo_fk = $id_amigo_fk",{
      $id_amigo_fk: id_amigo_fk
    },function(err:any, res:any){
      callback(res,err)
    })
  },
  devolucao: function(id_revista_fk:number, id_amigo_fk:number,callback:any){
    db.run("DELETE FROM Revista_emprestada WHERE id_revista_fk = $id_revista_fk AND id_amigo_fk = $id_amigo_fk",{
      $id_amigo_fk: id_amigo_fk,
      $id_revista_fk: id_revista_fk
    },function(){
      callback()
    })
  }
}