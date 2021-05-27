require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const server = require("express")();
const axios = require("axios").default;

const token = process.env.TELEGRAM_BOT_KEY;
var auth = "";

axios
  .get(`http://localhost:3333/api/v1/login`, {
    auth: {
      username: "bot@bot.com",
      password: "123456789",
    },
  })
  .then((response) => {
    auth = response.data.token;
    console.log(auth);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const bot = new TelegramBot(token, { polling: true });

async function SaveMessage(chatID, message) {
  try {
    await axios.post(
      `http://localhost:3333/api/v1/telegram/message`,
      {
        telegram_id: chatID,
        message: message,
      },
      {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      }
    );
    return true;
  } catch (err) {
    return false;
  }
}

async function AddUser(chatID, Name) {
  try {
    const response = await axios.post(
      `http://localhost:3333/api/v1/telegram`,
      {
        telegram_id: chatID,
        name: Name,
      },
      {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

bot.on("message", async (msg) => {
  const { id, first_name } = msg.chat;

  try {
    await axios.get(`http://localhost:3333/api/v1/telegram/${id}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });
  } catch (err) {
    AddUser(id, first_name);
  }

  const status = SaveMessage(id, msg.text);
  if (!status) {
    bot.sendMessage(id, "Desculpe o sistema está fora do ar no sistema");
  }

  console.log(
    await SaveMessage(
      "01",
      "Recebemos a sua mensagem embreve nosso suporte ira entrar em contato"
    )
  );

  bot.sendMessage(
    id,
    "Recebemos a sua mensagem embreve nosso suporte ira entrar em contato"
  );
});

server.get("/send", async (req, res) => {
  const { id, message, key } = req.query;
  console.log(req.query);
  if (key !== process.env.KEY) {
    console.log(key);
    console.log(process.env.KEY);
    return res.status(401).send("");
  }
  try {
    await bot.sendMessage(id, message);
    await SaveMessage("01", message);
    return res.send("");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

server.listen(3001, () => {
  console.log(auth);
});
