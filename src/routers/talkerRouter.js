const express = require('express');

const talkerRouter = express.Router();

const {readFile, writeFile} = require('../helper/fsHelper');
  
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

module.exports = talkerRouter;