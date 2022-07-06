// const { Telegraf } = require('telegraf')
// const bot = new Telegraf('5008402840:AAFbM2PnX2qrXAm42S55y5vXDT8mg_fXbFo') 
// bot.start((ctx) => ctx.reply(`Hello ${ctx.message.from.first_name}`))
// bot.help((ctx) => ctx.reply(''))
// //bot.on('sticker', (ctx) => ctx.reply('Good Sticker!')) //bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
// bot.launch() 

const TeleBot = require('telebot');
const bot = new TeleBot('5054740946:AAHPZr3ihBLI9NhFCgbxOYagjc7DlYruW9E');

const API = 'https://thecatapi.com/api/images/get?format=src&type=';

const replyMarkup = bot.keyboard([
    ['/kitty', '/kittygif']
], {resize: true, once: false});

bot.on('text', function (msg) {
    console.log(`[text] ${ msg.chat.id } ${ msg.text }`);
});

bot.on(['/start', '/help'], function (msg) {

    return bot.sendMessage(msg.chat.id,
        ' Use command: /kitty, /kittygif and /about', {replyMarkup}
    );

});

bot.on('/about', function (msg) {

    let text = 'telegram bot - node.js';

    return bot.sendMessage(msg.chat.id, text);

});

bot.on(['/kitty', '/kittygif'], function (msg) {

    let promise;
    let id = msg.chat.id;
    let cmd = msg.text.split(' ')[0];

    if (cmd == '/kitty') {
        promise = bot.sendPhoto(id, API + 'jpg', {
            fileName: 'kitty.jpg',
            serverDownload: true
        });
    } else {
        promise = bot.sendDocument(id, API + 'gif#', {
            fileName: 'kitty.gif',
            serverDownload: true
        });
    }

    bot.sendAction(id, 'upload_photo');

    return promise.catch(error => {
        console.log('[error]', error);
        bot.sendMessage(id, ` error ${ error }, try again.`);
    });

});

bot.start();
