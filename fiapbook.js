//instalando programas 

const mongoose = require("mongoose");

const express = require("express");

const bodyParser = require("body-parser");

//configurando o roteamento para teste no postman 

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

const port= 3000; 

//configurando o acesso ao mongodb 

mongoose.connect('mongodb://127.0.0.1:27017/teste',  
{ 
    serverSelectionTimeoutMS: 20000
});

//criando as models usuario e produto

//model padrao

const usuarioSchema = new mongoose.Schema({ 
    nome : {type : String, require : true},
    email : {type : String, require : true}, 
    senha : {type : Number, require : true}
});

const usuario = mongoose.model("usuario", usuarioSchema);

//model especifica 

const livroSchema = new mongoose.Schema({
    codigo : {type : Number, require : true}, 
    descricao : {type : String, require : true}, 
    fornecedor :  {type : String},
    dataFabricacao : {type : Date, require : true},
    quantidadeEstoque : {type : Number, require : true},
});

const livro = mongoose.model("Livro", livroSchema);

//configurando os roteamentos 

//rota /cadastrousuario
app.post("/cadastrousuario", async(req, res)=>{; 
    const nome = req.body.nome;
    const email =  req.body.email;
    const senha = req.body.senha;

    const Usuario = new usuario({
        nome : nome,
        email : email, 
        senha : senha
    })

    try{
        const newusuario = await Usuario.save(); 
        res.json({error : null, msg : "Usuário válido", usuarioId : newusuario._id}); 
    } 
    
    catch(error){
        res.status(400).json({error}); 
    }
}); 

//rota /get
app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html")
})

//rota /cadastroprodutolivro

app.post("/cadastroprodutolivro", async(req, res)=>{; 
    const codigo =  req.body.codigo;
    const descricao = req.body.descricao;
    const fornecedor = req.body.fornecedor;
    const dataFabricacao = req.body.dataFabricacao; 
    const quantidadeEstoque = req.body.quantidadeEstoque;

    const livroProduto = new livro({
        codigo : codigo,
        descricao : descricao,
        fornecedor : fornecedor, 
        dataFabricacao : dataFabricacao,
        quantidadeEstoque : quantidadeEstoque
    })

    try{
        const newlivro = await livroProduto.save(); 
        res.json({error : null, msg : "Livro cadastrado", livroProdutoId : newlivro._id}); 
    } 
    
    catch(error){
        res.status(400).json({error}); 
    }
}); 

//conectando a porta 

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})
