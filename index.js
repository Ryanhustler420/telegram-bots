const { exec } = require('child_process');
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Telegram Bot API");
});

app.post("/bots/create", async (req, res) => {
  const { token, username, password } = req.body;
  // save this token to db

  exec(`pm2 start bot.js --name=${username} -- --TOKEN=${token}`, (error, stdout, stderr) => {});
  res.json({ msg: `Registered ${token}` });
});

app.post("/bots/send/message", async (req, res) => {
  const { token, chatid, text } = req.body;
  try {
    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatid,
      text: text || "",
    });
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
    return res.json({ send: 'not' });
  }
  res.json({ sent: 'ok' });
});

app.delete("/bots/:token", async (req, res) => {
  // removes from database
  // it will show effect on next restart
  res.json({ ok: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on: ${PORT}`);
  // get the tokens from db then loop and spin new services.
});