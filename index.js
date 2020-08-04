//http://discordapp.com/oauth2/authorize?&client_id=697901929518334053&scope=bot&permissions=8
//http://discordapp.com/oauth2/authorize?&client_id=698654524671524955&scope=bot&permissions=8

var prefix = '-'

require('dotenv').config()
const Discord = require('discord.js')
const PropertiesReader = require('properties-reader')

const token = process.env.TOKEN
const client = new Discord.Client()

client.on('ready', () => {
    console.log(`Connected as ${client.user.tag}`)
    client.user.setPresence({
        activity: {
            name: 'IntelliJ IDEA',
        },
        status: 'available',
    })
})

client.on('message', (msg) => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return

    const args = msg.content.slice(prefix.length).split(' ')
    const command = args.shift().toLowerCase()

    if (command === 'kwasi') {
        msg.reply('Hallo ik ben Kwasi!')
    }

    console.log(parseInt(args[0]))

    if (command === 'clear') {
        if (!msg.member.hasPermission('MANAGE_MESSAGES')) {
            msg.channel
                .send('Je mag dit niet doen stinkaap')
                .then(botmsg => {
                    botmsg.delete({ timeout: 3000 })
                })
        } else if (!typeof(parseInt(args[0])) === 'number') {
            msg.channel
                .send('Je mag dit niet doen stinkaap')
                .then(botmsg => {
                    botmsg.delete({ timeout: 3000 })
                })
        } else if (!args.length) {
            msg.channel
                .send('No arguments provided.')
                .then(botmsg => {
                    botmsg.delete({ timeout: 3000 })
                })
        } else {
            msg.channel.messages
                .fetch({ limit: parseInt(args[0]) + 1 })
                .then((messages) => {
                    msg.channel.bulkDelete(messages)
                })
            msg.channel
                .send(args[0] + ' messages have been removed!')
                .then(botmsg => {
                    botmsg.delete({ timeout: 3000 })
                })
        }
    }

    if (command === 'amus') {

    }
})

client.login(token)