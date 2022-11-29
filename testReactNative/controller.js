
const express=require('express');
const bodyParser=require('body-parser');

const cors=require('cors');
const model=require('../testReactNative/models');

let app=express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.post('/create',async(req,res)=>{
    let reqs = await model.User.create({
        'name' : req.body.nomeUser,
        'password' : req.body.passwordUser,
        'email' : req.body.emailUser,
        'data' : req.body.dataUser,
        'createdAt': new Date(),
        'updatedAt': new Date(),
    });
  
})

let port =process.env.PORT || 3000;

app.listen(port,(req,res)=>{
    console.log("abriu")
   
});

