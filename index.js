const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/webhook", async (req, res) => {
  const message = req.body.message || "🚨 Новый сигнал!";
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "HTML"
    });
    res.status(200).send("Sent to Telegram");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.get("/", (req, res) => res.send("Webhook active"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
