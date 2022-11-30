const bcrypt = require('bcrypt');
const express=require('express');
const bodyParser=require('body-parser');
const jwt = require('jsonwebtoken');

const cors=require('cors');
const model=require('./models');

let user= model.User;
let app=express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/cadastro',async(req,res)=>{
  
    req.body.password =  await bcrypt.hash(req.body.password, 6);
    let reqs = await model.User.create({
        'name' : req.body.nomeUser,
        'password' :req.body.password,
        'email' : req.body.email,
        'data' : req.body.dataUser,
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
   const usuario = await user.findOne({
        attributes: ['id', 'name', 'data', 'email', 'password'],
        where:{ 
            email: req.body.email, 
            password: req.body.password 
        }
    })

    if(usuario === null){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou senha incorreto"
        });
    }

    if(!(await bcrypt.compare(req.body.password, usuario.password))){
        return res.status(400).json({
            erro:true,
            mensagem:"Erro: Usuário ou a senha incorreta!"
        })
    }
    let token = jwt.sign({id: user.id},"D62S",{
       expiresIn: '7D'
    });
    return res.json({
        erro:false,
        mensagem: "Login realizado com sucesso!",
        token
    })
});


let port =process.env.PORT || 3000;

app.listen(port,(req,res)=>{
    console.log("abriu")
   
});

