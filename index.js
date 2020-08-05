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

    if (command === 'clear') {
        if (!msg.member.hasPermission('MANAGE_MESSAGES')) {
            msg.channel
                .send('je mag dit niet doen stinkaap')
                .then(botmsg => {
                    botmsg.delete({ timeout: 3000 })
                })
        } else if (isNaN(parseInt(args[0]))) {
            msg.channel
                .send('a domme hoer je moet cijfer doen')
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
        const members = msg.member.voice.channel.members
        const channelHasMute = typeof(members.find(member => member.voice.serverMute === false)) === 'undefined'
        console.log(channelHasMute)
        members.forEach(member => member.voice.setMute(!channelHasMute))
    }
})

client.login(token)