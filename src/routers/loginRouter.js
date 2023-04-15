const express = require('express');
const randomToken = require('../helper/randomToken');
const handleEmail = require('../middleware/handleEmail');
const handlePassword = require('../middleware/handlePassword');

const loginRouter = express.Router();

// const {readFile, writeFile} = require('../helper/fsHelper');

loginRouter.post('/',
handleEmail,
handlePassword,
async (req, res) => res.status(200).json({ token: randomToken() }));

  module.exports = loginRouter;