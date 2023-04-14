const crypto = require('crypto');

const randomToken = () => {
  const token = crypto.randomBytes(12).toString('base64').replace(/[\+\/]/g, '').padEnd(16, '0');

  return token;
}

console.log(randomToken());
module.exports = randomToken;
