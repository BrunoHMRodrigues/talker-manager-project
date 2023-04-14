const fs = require('fs/promises');
const express = require('express');

const talkerRouter = express.Router();

const readFile = async () => {
  const talkers = await fs.readFile('src/talker.json', 'utf-8');
  return JSON.parse(talkers);
}

const writeFile = async (talkerArray) => {
  await fs.writeFile('src/talker.json', JSON.stringify(talkerArray));
}
  
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