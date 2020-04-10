//http://discordapp.com/oauth2/authorize?&client_id=697901929518334053&scope=bot&permissions=8

const Discord = require('discord.js');
const PropertiesReader = require('properties-reader');

const token = PropertiesReader('properties.ini').path().config.token;
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log("Connected");
    bot.user.setPresence({
        activity: {
            name: 'IntelliJ IDEA'
        },
        status: 'available'
    });
});

bot.login(token);

