const { fetchTokens, insertToken, deleteToken } = require('./supabase');
const { newProcess, deleteProcess, status } = require('./helpers');
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Telegram Bot API");
});

app.post("/bots/create", async (req, res) => {
  const { token, username, password } = req.body;
  await insertToken(token, username);
  await newProcess(username, token);
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

app.post("/bots/delete", async (req, res) => {
  const { username, password } = req.body;
  deleteToken(username);
  deleteProcess(username);
  res.json({ ok: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  const tokens = await fetchTokens();
  for (let i = 0; i < tokens.length; i++) {
    console.log(`Starting: /${tokens[i].username}`);
    (await newProcess(tokens[i]?.username, tokens[i]?.token));
  }
  (await status());
  console.log(`App is running on: ${PORT}`);
});