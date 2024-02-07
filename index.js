const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const token = '5914656121:AAGflULBHGEWCAfCLW1N0zDZgYAXhoQX2Ks';
const admin = '5304264698'
const API_URL = "https://super-insta-api.vercel.app/ig?url=";

const bot = new TelegramBot(token, { polling: true });


const app = express();
app.get("/", (req, res) => {
  res.send("hello")
})

let port = 4040;
app.listen(port, () => {
  console.log(`https://localhost:${port} [server ishlamoqda...`)
})


const botstrap = () => {

  bot.setMyCommands([
    { command: "/start", description: "🔆 Botni ishga tushirish ♻️" },
    { command: "/info", description: "🔰 Malumot olish" },
    { command: "/admin", description: "👨‍💻 Admin Panel"},
  ]);

  
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const txt = msg.text;
    if (txt == "/start") {
      bot.sendMessage(chatId, `👋🏻 Assalomu alaykum <a href='tg://user?id=${msg.chat.id}'>${msg.chat.first_name}</a> botimizga xush kelibsiz! `, { parse_mode: 'html' });
      bot.sendMessage(admin, `🔔Botimizda Yangi azo
➖➖➖➖➖➖➖➖➖
 <a href = 'tg://user?id=${chatId}'>${msg.chat.first_name}</a> Botga🤖 /start Bosdi!
<b>🔔 Usernamesi:</b> @${msg.chat.username}
<b>🆔️ Raqami:</b> <code>${chatId}</code>
➖➖➖➖➖➖➖➖➖
 `, { parse_mode: 'html' });
    } else if (txt.includes("instagram.com")) {
      bot.sendMessage(chatId, "⌛");
      fetch(API_URL + txt)
        .then(res => res.json())
        .then(data => {
          //console.log(data)
          if (data.status) {
            if (data.data.length == 1) {
              let typee = data.data[0].type;
              if (typee == "video") {
                bot.sendVideo(chatId, data.data[0].url, { caption: "Video @TezkorYuklashBot orqali yuborildi!" })
              } else if (typee == "image") {
                bot.sendPhoto(chatId, data.data[0].url, { caption: "Rasm @TezkorYuklashBot orqali yuborildi!" })
              }
            } else {
              data.data.forEach(res => {
                bot.sendVideo(chatId, res.url)
              });
              bot.sendMessage(chatId, "@TezkorYuklashBot botdan foydalanganinggizda xursandmiz")
            }
          } else {
            bot.sendMessage(chatId, "Havolada xatolik..")
          }
        })
        .catch(err => {
          bot.sendMessage(chatId, "Xatolik qayta urinib ko'ring!")
        });
      //igapi(chatId,text)
    } else if(txt == "/info") {
      bot.sendMessage(chatId,"@TezkorYuklashBot instagramdan media yuklab berishga yordam beradi.\n\n👨‍💻Bot admini: @super_coder\n\n➖➖➖➖➖➖\n🧨Bot 2023-yil 7-fevral kunidan boshlab ishlab kelmoqda.")
    } else if(txt == "/admin"){
      bot.sendMessage(chatId,"Siz admin panelga kira olmaysiz.");
    } else {
      bot.sendMessage(chatId, 'Instagram havolasini yuboring!!!');
    }
  });
}
botstrap()
