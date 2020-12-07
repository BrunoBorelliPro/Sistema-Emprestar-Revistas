import express, { json, request, response } from "express";
let corName:String = "azul"
var sqlite = require("./sqlite")


const app = express();
app.use(json());

app.get("/caixa", (request, response) => {
  sqlite.getCaixaList((res)=>{
    return response.json(res)
  })
});

app.post('/caixa',(request, response)=>{
    const cor = request.body.cor
    sqlite.addCaixa(cor,()=>console.log("Cor adicionada!"))
    response.json(cor)
})

app.delete('/caixa',(request, response)=>{
    const cor = request.body.cor
    sqlite.deleteCaixa(cor,()=>console.log("Cor deletada!"))
    response.json(cor)
})

app.post("/amigo", (request, response)=>{
  const amigo = request.body
  sqlite.addAmigo(amigo,()=>{
    console.log("Amigo adicionado!")
  })
  return response.json(amigo)
})

app.get("/amigo",(request, response)=>{
  sqlite.getAmigo((res)=>{
    console.log(res)
    response.json(res)
  })
})
app.delete('/amigo',(request, response)=>{
  const nome:string = request.body.nome
  sqlite.deleteAmigo(nome,()=>console.log(`Amigo ${nome} deletado!`))
  response.json(nome)
})
app.post("/revista", (request, response)=>{
  const revista = request.body
  sqlite.addRevista(revista,(res)=>{
    console.log("Revista adicionada!")
  })
  return response.json("Revista adicionada!")
})

app.get("/revista",(request, response)=>{
  sqlite.getRevista((res)=>{
    console.log(res)
    response.json(res)
  })
})
app.delete("/revista",(request, response)=>{
  const titulo = request.body.titulo
  sqlite.deleteRevista(titulo,()=>{
    console.log("Revista deletada!")
    response.json(titulo)
  })
})

app.post("/emprestimo",(request, response)=>{
  const id_revista = request.body.id_revista
  const id_amigo = request.body.id_amigo
  sqlite.emprestaRevista(id_revista, id_amigo,()=>{
    console.log("Revista emprestada com sucesso!")
    response.json({
      "id_revista":id_revista,
      "id_amigo":id_amigo
    })
  })
})
app.get("/emprestimo",(request, response)=>{
  const id_amigo_fk = request.body.id_amigo
  sqlite.getEmprestimos(id_amigo_fk,(res,err)=>{
    response.json(res)
  })
})
app.delete("/emprestimo",(request, response)=>{
  const id_amigo_fk = request.body.id_amigo
  const id_revista_fk = request.body.id_revista
  sqlite.devolucao(id_revista_fk,id_amigo_fk,()=>{
    response.json({
      "id_amigo_fk":id_amigo_fk,
      "id_revista_fk":id_revista_fk
    })
  })
  console.log("Devolução concluida!")
})
app.listen(3000, () => {
});

