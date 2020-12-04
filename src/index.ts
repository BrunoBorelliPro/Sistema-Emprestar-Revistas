import express, { json, request, response } from "express";
let corName:String = "azul"
var sqlite = require("./sqlite")


const app = express();
app.use(json());

app.get("/", (request, response) => {
  sqlite.getCaixaList((res)=>{
    return response.json(res)
  })
});

app.post('/',(request, response)=>{
    const cor = request.body.cor
    sqlite.addCor(cor,()=>console.log("Cor adicionada!"))
    response.json(cor)
})

app.delete('/',(request, response)=>{
    const cor = request.body.cor
    sqlite.deleteCor(cor,()=>console.log("Cor deletada!"))
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


app.listen(3000, () => {
  console.log("oi")
});

