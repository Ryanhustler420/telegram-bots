const { exec } = require('child_process');

const newProcess = async (username, token) => {
  exec(`pm2 start bot.js --name=${username} -- --TOKEN=${token}`, (error, stdout, stderr) => {});
}

const deleteProcess = async (username) => {
  exec(`pm2 delete ${username}`, (error, stdout, stderr) => {});
}

const status = async () => {
  exec('pm2 status', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(stdout);
  });
}

module.exports = {
  status,
  newProcess,
  deleteProcess,
}