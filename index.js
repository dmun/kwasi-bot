//http://discordapp.com/oauth2/authorize?&client_id=697901929518334053&scope=bot&permissions=8
//http://discordapp.com/oauth2/authorize?&client_id=698654524671524955&scope=bot&permissions=8

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
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'kwasi') {
        msg.reply('Hallo ik ben Kwasi!')
    }

    if (command === 'bke') {
        var gameEmbed = new Discord.MessageEmbed()
            .setDescription('\:white_large_square: \:white_large_square: \:white_large_square:\n' +
                '\:white_large_square: \:white_large_square: \:white_large_square:\n' +
                '\:white_large_square: \:white_large_square: \:white_large_square:\n');
        msg.channel.send(gameEmbed);
    }

    if (command === 'take') {
        if (!args.length) {
            msg.channel.send('No arguments provided.');
        } else {
            const mentioned = msg.mentions.users.first();
            client.user.setAvatar(mentioned.avatarURL());
            client.user.setUsername(mentioned.username());
        }
    }

    if (command === 'clear') {
        if (!args.length) {
            msg.channel.send('No arguments provided.');
        } else {
            msg.channel.messages.fetch({ limit: parseInt(args[0]) + 1 }).then(messages => {
                msg.channel.bulkDelete(messages);
            });

            msg.channel.send(args[0] + ' messages have been removed!').then(botmsg => {
                botmsg.delete(3000);
            });
        }
    }
});


client.login(token);

