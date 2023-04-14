const express = require('express');

const talkerRouter = express.Router();

const {readFile, writeFile} = require('../helper/fsHelper');
const validateDate = require('../helper/validateDate');
  
talkerRouter.get('/', async (req, res) => {
  const talkers = await readFile();
  return res.status(200).json(talkers);
})

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  if(!(id in talkers)) res.status(404).json({message: 'Pessoa palestrante não encontrada'})
  return res.status(200).json(talkers[id-1]);
})

talkerRouter.post('/', async (req, res) => {
  const { authorization: token } = req.headers;
  if(!token) return res.status(401).json({message: 'Token não encontrado'});
  if(!(token.length === 16 && typeof token === 'string')) return res.status(401).json({message: 'Token inválido'});

  const { name, age, talk, rate } = req.body;
  if(!name) return res.status(400).json({ message: `O campo "name" é obrigatório`});
  if(name.length < 3) return res.status(400).json({ message: `O "name" deve ter pelo menos 3 caracteres`});

  if(age === undefined) return res.status(400).json({ message: `O campo "age" é obrigatório`});
  if(!(Number.isInteger(age) && Number(age) >= 18)) return res.status(400).json({ message: `O campo "age" deve ser um número inteiro igual ou maior que 18`});

  if(!talk) return res.status(400).json({ message: `O campo "talk" é obrigatório`});
  const { watchedAt } = talk;
  if(!watchedAt) return res.status(400).json({ message: `O campo "watchedAt" é obrigatório`});
  if(!validateDate(watchedAt)) return res.status(400).json({ message: `O campo "watchedAt" deve ter o formato "dd/mm/aaaa"`});

  if(rate === undefined) return res.status(400).json({ message: `O campo "rate" é obrigatório`});
  if(!(Number.isInteger(rate) && Number(rate) >= 1 && Number(rate) <= 5)) return res.status(400).json({ message: `O campo "rate" deve ser um número inteiro entre 1 e 5`});

  const talkers = await readFile();
  const id = talkers.length;
  return res.status(201).json({ id, name, age, talk, rate })
})

module.exports = talkerRouter;