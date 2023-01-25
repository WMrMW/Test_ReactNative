const bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const cors = require('cors');
const model = require('./models');
const { stringify } = require('uuid');

let user = model.User;
let peso = model.Peso;
let app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());








app.post('/cadastro', async (req, res) => {

    const dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 10);
    let reqs = await model.User.create({
        'name': dados.nomeUser,
        'password': dados.password,
        'email': dados.email,
        'data': dados.dataUser,
        'createdAt': new Date(),
        'updatedAt': new Date(),
    });
    if (reqs) {
        res.send(JSON.stringify('Usuário cadastrado com sucesso!'))
    } else {
        res.send(JSON.stringify("ERRO: Não foi possível cadastrar o usuario!"));
    }
});





let port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
    console.log("abriu")

});

