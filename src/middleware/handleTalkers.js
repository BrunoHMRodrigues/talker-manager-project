const { readFile } = require("../helper/fsHelper");

const handleTalkers = async (req, res, next) => {
  const { id } = req.params;
  const talkers = await readFile();
  if (!(id in talkers)) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  next();
};
  
module.exports = handleTalkers;