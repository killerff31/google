const http = require('http');  
const TelegramBot = require('node-telegram-bot-api');  
  
const token = process.env.TELEGRAM_BOT_TOKEN;  
const bot = new TelegramBot(token, { polling: true });  
  
// Create an HTTP server  
const server = http.createServer((req, res) => {  
  res.writeHead(200, { 'Content-Type': 'text/plain' });  
  res.end('Telegram Bot is running!');  
});  
  
// Handle /start command  
bot.onText(/\/start/, (msg) => {  
  bot.sendMessage(msg.chat.id, 'Enter a Google Drive file link:');  
});  
  
// Handle incoming messages  
bot.on('message', (msg) => {  
  if (msg.text) {  
   const link = msg.text;  
   const fileId = extractFileId(link);  
  
   if (fileId) {  
    const downloadLink = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=AIzaSyB2Gi6A21kfBvBDs3MRfF5yKrp-nxmRbLQ`;  
    bot.sendMessage(msg.chat.id, downloadLink, {  
      caption: 'Direct Download Link',  
    });  
   } else {  
    bot.sendMessage(msg.chat.id, 'Invalid Google Drive file link format.');  
   }  
  }  
});  
  
// Extract file ID from Google Drive link  
function extractFileId(link) {  
  const regex = /\/file\/d\/([a-zA-Z0-9_-]+)/;  
  const match = link.match(regex);  
  return match && match[1];  
}  
  
// Start the server  
server.listen(3000, () => {  
  console.log('Telegram Bot is running on port 3000');  
});
