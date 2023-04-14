const express = require('express');
const validateEmail = require('../helper/validateEmail');
const randomToken = require('../helper/randomToken');

const loginRouter = express.Router();

// const {readFile, writeFile} = require('../helper/fsHelper');

loginRouter.post('/', async (req,res) => {
    const {email, password} = req.body;
    if(!email) return res.status(400).json({message: `O campo "email" é obrigatório`});
    if(!password) return res.status(400).json({message: `O campo "password" é obrigatório`});
    if(!validateEmail(email)) return res.status(400).json({message: `O "email" deve ter o formato "email@email.com"`});
    if(password.length  < 6) return res.status(400).json({message: 'O "password" deve ter pelo menos 6 caracteres'});
    return res.status(200).json({token: randomToken()})
  })

  module.exports = loginRouter;