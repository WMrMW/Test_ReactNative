const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = {
    eAdmin:  async function (req,res, next){
       const authHeader =  req.body.authorization;
       if(!authHeader){
        return res.status(400).json({
            erro: true,
            mensagem: "ERRO: Necessário realizar o login para acessar a página! A"
        })
       }

      const token = authHeader.split(' ');

      if(!token){
        return res.status(400).json({
            erro: true,
            mensagem: "ERRO: Necessário realizar o login para acessar a página! B"
        })
      }
      try{
        const decode = await promisify(jwt.verify)(token, "TESTE12CMPROJECT");
        req.UserId = decode.id
        return next();
      }catch(err){
        return res.status(400).json({
            erro: true,
            mensagem: "ERRO: Necessário realizar o login para acessar a página! C"
        })
      }
    }
}