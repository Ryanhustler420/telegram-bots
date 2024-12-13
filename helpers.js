const { exec } = require('child_process');

const newProcess = async (username, token) => {
  exec(`pm2 start bot.js --name=${username} -- --TOKEN=${token}`, (error, stdout, stderr) => {});
}

const deleteProcess = async (username) => {
  exec(`pm2 delete ${username}`, (error, stdout, stderr) => {});
}

module.exports = {
  newProcess,
  deleteProcess,
}