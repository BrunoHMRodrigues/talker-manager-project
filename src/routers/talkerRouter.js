const express = require('express');

const talkerRouter = express.Router();

const { readFile, writeFile } = require('../helper/fsHelper');

const handleToken = require('../middleware/handleToken');
const handleName = require('../middleware/handleName');
const handleAge = require('../middleware/handleAge');
const handleTalk = require('../middleware/handleTalk');
const handleWatchedAt = require('../middleware/handleWatchedAt');
const handleRate = require('../middleware/handleRate');
const handleSearchById = require('../middleware/handleSearchById');
const handleSearchByRate = require('../middleware/handleSearchByRate');
const handleSearchByWatchedAt = require('../middleware/handleSearchByWatchedAt');
const handlePatchRate = require('../middleware/handlePatchRate');
const connection = require('../connection');

talkerRouter.get('/db', async (req, res) => {
  try {
    const [result] = await connection.query('SELECT * FROM TalkerDB.talkers');
    const talkers = result.map((talker) => ({
      id: talker.id,
      name: talker.name,
      age: talker.age,
      talk: {
        watchedAt: talker.talk_watched_at,
        rate: talker.talk_rate,
      },
    }));
    
    // const talkers = result;
    return res.status(200).json(talkers);
  } catch (err) {
    console.error('Erro ao buscar os dados dos talkers:', err);
    return res.status(500).json({ message: 'Erro ao buscar os dados dos talkers' });
  }
});
  
talkerRouter.get('/search',
handleToken,
handleSearchByRate,
handleSearchByWatchedAt,
async (req, res) => {
  const { q: searchTerm, rate: rateNumber, date: watchedDate } = req.query;
  const talkers = await readFile();
  let filteredTalkers = talkers;

  if (searchTerm) {
    filteredTalkers = filteredTalkers.filter((talker) => talker.name.includes(searchTerm));
  }
  if (rateNumber) {
    filteredTalkers = filteredTalkers.filter((talker) => talker.talk.rate === Number(rateNumber));
  }
  if (watchedDate) {
    filteredTalkers = filteredTalkers.filter((talker) => talker.talk.watchedAt === watchedDate);
  }
  return res.status(200).json(filteredTalkers);
});

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
  const talkerSelected = talkers.find((talker) => talker.id === Number(id));
  return res.status(200).json(talkerSelected);
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

talkerRouter.put('/:id', 
handleToken,
handleName,
handleAge,
handleTalk,
handleWatchedAt,
handleRate,
handleSearchById,
async (req, res) => {
  const { id: searchId } = req.params;
  const { name, age, talk } = req.body;
  const changedTalker = { id: Number(searchId), name, age, talk };
  const talkers = await readFile();
  const filteredTalkers = talkers.filter((talker) => talker.id !== Number(searchId));

  await writeFile([...filteredTalkers, changedTalker]);
  
  return res.status(200).json(changedTalker);
});

talkerRouter.delete('/:id', handleToken, handleSearchById, async (req, res) => {
  const { id: searchId } = req.params;
  const talkers = await readFile();
  const filteredTalkers = talkers.filter((talker) => talker.id !== Number(searchId));

  await writeFile([...filteredTalkers]);
  return res.status(204).json({ message: {} });
});

talkerRouter.patch('/rate/:id', handleToken, handlePatchRate, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  const talkers = await readFile();
  const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
  talkers[talkerIndex].talk.rate = Number(rate);
  await writeFile(talkers);

  return res.status(204).json({});
});

module.exports = talkerRouter;