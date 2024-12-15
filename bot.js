const TelegramBot = require("node-telegram-bot-api");

const args = process.argv.slice(2);
const tokenArg = args.find(arg => arg.startsWith('--TOKEN='));

if (tokenArg) {
  const token = tokenArg.split('=')[1] || ""; // Extract the value after `--TOKEN=`
  const bot = new TelegramBot(token, { polling: true });
  // bot.setWebHook(`https://api.telegram.org/bot${token}`);

  // POSTMAN
  // https://api.telegram.org/bot{TOKEN}/setWebhook?url=https://random.ngrok-free.app

  bot.setMyCommands([
    { command: '/start', description: 'Start interacting with the bot' },
    { command: '/getchatid', description: 'Get your chat ID' },
    { command: '/gettoken', description: 'Get your token ID' },
    { command: '/options', description: 'Show a custom keyboard' },
    { command: '/more', description: 'Display more links' },
    { command: '/quote', description: 'Get a random motivational quote' },
    { command: '/weather', description: 'Get weather info (e.g., /weather city)' },
    { command: '/remindme', description: 'Set a reminder (e.g., /remindme 1m Buy milk)' },
    { command: '/joke', description: 'Get a random joke' },
  ]);

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const name = msg.chat.first_name || "there";
    bot.sendMessage(chatId, `Hello ${name}! Welcome to my bot.`);
  });
  
  bot.onText(/\/getchatid/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Your chat ID: ${chatId}`);
  });
  
  bot.onText(/\/gettoken/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Your token: ${token}`);
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
  
  bot.onText(/\/more/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'WarAdda', url: 'https://www.waradda.com' }],
          [{ text: 'Telegram API', url: 'https://ogochukwubeau-telegram-bots.onrender.com' }],
          [{ text: 'Reply', callback_data: 'reply_action' }],
        ],
      },
    };
    bot.sendMessage(chatId, 'Here are more:', options);
  });

  bot.onText(/\/quote/, (msg) => {
    const chatId = msg.chat.id;
    const quotes = [
      "Believe in yourself and all that you are.",
      "The future depends on what you do today.",
      "Success is not the key to happiness. Happiness is the key to success.",
      "Don't watch the clock; do what it does. Keep going."
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    bot.sendMessage(chatId, randomQuote);
  });

  bot.onText(/\/weather (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const city = match[1];
    bot.sendMessage(chatId, `Weather info for ${city}: Sunny, 25°C (placeholder data)`);
    // For real data, integrate with a weather API like OpenWeatherMap.
  });

  bot.onText(/\/remindme (\d+)([smhd]) (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const duration = parseInt(match[1]);
    const unit = match[2];
    const task = match[3];

    let delay = 0;
    if (unit === 's') delay = duration * 1000;
    else if (unit === 'm') delay = duration * 60 * 1000;
    else if (unit === 'h') delay = duration * 60 * 60 * 1000;
    else if (unit === 'd') delay = duration * 24 * 60 * 60 * 1000;

    bot.sendMessage(chatId, `Reminder set for ${task} in ${duration}${unit}`);
    setTimeout(() => {
      bot.sendMessage(chatId, `Reminder: ${task}`);
    }, delay);
  });

  bot.onText(/\/joke/, (msg) => {
    const chatId = msg.chat.id;
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "What do you call fake spaghetti? An impasta!"
    ];
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    bot.sendMessage(chatId, randomJoke);
  });
  
  bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    bot.sendMessage(chatId, `You clicked: ${query.data}`);
  });
  
  // Reply to any text message
  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (!text.startsWith('/')) { // Avoid echoing commands
      bot.sendMessage(chatId, `You said: ${text}`);
    }
  });
} else {
  console.log('No token provided, please provide --TOKEN=? like this');
}