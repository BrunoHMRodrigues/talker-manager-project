const fs = require('fs/promises');

const readFile = async () => {
const talkers = await fs.readFile('src/talker.json', 'utf-8');
return JSON.parse(talkers);
};
  
const writeFile = async (talkerArray) => {
await fs.writeFile('src/talker.json', JSON.stringify(talkerArray));
};

module.exports = { readFile, writeFile };