//http://discordapp.com/oauth2/authorize?&client_id=697901929518334053&scope=bot&permissions=8
var prefix = '$';

const Discord = require('discord.js');
const PropertiesReader = require('properties-reader');

const token = PropertiesReader('properties.ini').path().config.token;
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Connected as ${client.user.tag}`);
    client.user.setPresence({
        activity: {
            name: 'IntelliJ IDEA'
        },
        status: 'available'
    });
});

client.on('message', msg => {
    if (msg.content === prefix + 'kwasi') {
        msg.reply('Hallo ik ben Kwasi!')
    }

    if (msg.content === prefix + 'bke') {
        var gameEmbed = new Discord.MessageEmbed()
            .setDescription('\:white_large_square: \:white_large_square: \:white_large_square:\n' +
                '\:white_large_square: \:white_large_square: \:white_large_square:\n' +
                '\:white_large_square: \:white_large_square: \:white_large_square:\n');
        msg.channel.send(gameEmbed);
    }
});


client.login(token);

