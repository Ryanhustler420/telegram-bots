const { exec } = require('child_process');

const newProcess = async (username, token) => {
  await new Promise((res, rej) => {
    exec(`pm2 start bot.js --name=${username} -- --TOKEN=${token}`, (error, stdout, stderr) => {
      if (error) {
        rej(error);
        return;
      }
  
      if (stderr) {
        rej(stderr);
        return;
      }
  
      res(stdout);
    });
  })
}

const deleteProcess = async (username) => {
  exec(`pm2 delete ${username}`, (error, stdout, stderr) => {});
}

const deleteAllProcess = async (username) => {
  exec(`pm2 delete all`, (error, stdout, stderr) => {});
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
  deleteAllProcess,
}