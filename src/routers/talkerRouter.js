const express = require('express');

const talkerRouter = express.Router();

const { readFile, writeFile } = require('../helper/fsHelper');

const handleToken = require('../middleware/handleToken');
const handleName = require('../middleware/handleName');
const handleAge = require('../middleware/handleAge');
const handleTalk = require('../middleware/handleTalk');
const handleWatchedAt = require('../middleware/handleWatchedAt');
const handleRate = require('../middleware/handleRate');
  
talkerRouter.get('/', async (req, res) => {
  const talkers = await readFile();
  return res
  .status(200)
  .json(talkers);
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  if (!(id in talkers)) {
    return res
    .status(404)
    .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkers[id - 1]);
});

talkerRouter.post('/',
handleToken,
handleName,
handleAge,
handleTalk,
handleWatchedAt,
handleRate,
async (req, res) => {
  const { name, age, talk } = req.body;

  const talkers = await readFile();
  const id = talkers.length + 1;
  const newTalker = {
    id,
    name,
    age,
    talk,
  };
  await writeFile([...talkers, newTalker]);
  return res.status(201).json(newTalker);
});

module.exports = talkerRouter;