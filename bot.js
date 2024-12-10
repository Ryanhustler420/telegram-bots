const TelegramBot = require("node-telegram-bot-api");

const args = process.argv.slice(2);
const tokenArg = args.find(arg => arg.startsWith('--TOKEN='));

if (tokenArg) {
  const token = tokenArg.split('=')[1] || ""; // Extract the value after `--TOKEN=`
  const bot = new TelegramBot(token, { polling: true });
  // bot.setWebHook(`https://api.telegram.org/bot${token}`);

  // POSTMAN
  // https://api.telegram.org/bot{TOKEN}/setWebhook?url=https://random.ngrok-free.app

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const name = msg.chat.first_name || "there";
    bot.sendMessage(chatId, `Hello ${name}! Welcome to my bot.`);
  });
  
  bot.onText(/\/getchatid/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Your chat id: ${chatId}`);
  });
  
  bot.onText(/\/options/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
      reply_markup: {
        keyboard: [['Option 1', 'Option 2'], ['Option 3']],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };
    bot.sendMessage(chatId, 'Choose an option:', options);
  });
  
  bot.onText(/\/buttons/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Google', url: 'https://www.google.com' }],
          [{ text: 'Reply', callback_data: 'reply_action' }],
        ],
      },
    };
    bot.sendMessage(chatId, 'Here are your buttons:', options);
  });
  
  bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    bot.sendMessage(chatId, `You clicked: ${query.data}`);
  });
  
  // Reply to any text message
  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
  
    // Echo the received message
    bot.sendMessage(chatId, `You said: ${text}`);
  });
} else {
  console.log('No token provided, please provide --TOKEN=? like this');
}