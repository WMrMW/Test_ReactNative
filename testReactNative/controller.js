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
            password: dados.password 
        }
        
    });



    if(usuario === null){
        res.send(JSON.stringify('Erro: Usuário ou senha incorretos!'));
    }
    else{
        res.send(usuario); 
    }

    /*
    let compareSenha = await bcrypt.compare(req.body.password, user.password);
    
    if(!(compareSenha)){
        res.send(JSON.stringify('Erro: Usuário não encontrado!'));
    }else{
        res.send(usuario)
    }
   
 
 if(!(await bcrypt.compare(req.body.password, user.password))){
     return res.status(400).json({
         erro:true,
         mensagem:"Erro: Usuário ou a senha incorreta!"
     })
 }
 
 let token = jwt.sign({id: user.id},"TESTE12CMPROJECT",{
    expiresIn: '7D'
 });
 return res.json({
     erro:false,
     mensagem: "Login realizado com sucesso!",
     token: token,
 });


 console.log(token);

*/
});


let port =process.env.PORT || 3000;

app.listen(port,(req,res)=>{
    console.log("abriu")
   
});

