const bcrypt = require('bcrypt');
const express=require('express');
const bodyParser=require('body-parser');
const jwt = require('jsonwebtoken');

const cors=require('cors');
const model=require('./models');
const { stringify } = require('uuid');

let user= model.User;
let app=express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/cadastro',async(req,res)=>{
  
    const dados = req.body;
    dados.password = await bcrypt.hash(dados.password,10);
    let reqs = await model.User.create({
        'name' : dados.nomeUser,
        'password' : dados.password,
        'email' : dados.email,
        'data' : dados.dataUser,
        'createdAt': new Date(),
        'updatedAt': new Date(),
    });
    if(reqs){
        res.send(JSON.stringify('Usuário cadastrado com sucesso!'))
    }else{
        res.send(JSON.stringify("ERRO: Não foi possível cadastrar o usuario!"));
    }
});


app.post('/login',async(req,res)=>{

   const dados = req.body;
   const usuario = await user.findOne({
        attributes: ['id', 'name', 'data', 'email', 'password'],
        where:{ 
            email: dados.email,
        }
        
    });

    if(usuario === null){
        res.send(JSON.stringify('Erro: Usuário ou senha incorretos!'));
    }
    const compareSenha = await bcrypt.compare(req.body.password, usuario.password);
    if(!(compareSenha)){
        res.send(JSON.stringify('Erro: Usuário ou senha incorretos!'));
    }else{
        res.send(usuario);
    }
    console.log(usuario);


});


let port =process.env.PORT || 3000;

app.listen(port,(req,res)=>{
    console.log("abriu")
   
});

