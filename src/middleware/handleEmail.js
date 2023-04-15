const validateEmail = require('../helper/validateEmail');

const handleEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res
    .status(400)
    .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail(email)) {
    return res
    .status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

module.exports = handleEmail;