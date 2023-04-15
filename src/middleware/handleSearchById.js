const { readFile } = require("../helper/fsHelper");

const handleSearchById = async (req, res, next) => {
  const { id: searchId } = req.params;
  const talkers = await readFile();
//   const filteredTalkers = talkers.filter((talker) => talker.id !== Number(searchId));
  if(!(talkers.some((talker) => talker.id === Number(searchId)))) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  next();
};

module.exports = handleSearchById;