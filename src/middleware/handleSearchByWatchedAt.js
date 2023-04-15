const { readFile } = require('../helper/fsHelper');

const handleSearchByWatchedAt = async (req, res, next) => {
    const { date } = req.query;
    if (date && !validateDate(date)) {
        return res
        .status(400)
        .json({ message: 'O parâmetro "watchedAt" deve ter o formato "dd/mm/aaaa"' });
      }
  next();
};

module.exports = handleSearchByWatchedAt;