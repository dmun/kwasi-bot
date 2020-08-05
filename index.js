var prefix = '-'

require('dotenv').config()
const token = process.env.TOKEN
const Discord = require('discord.js')
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
                .then(botmsg => botmsg.delete({ timeout: 3000 }))
        } else if (isNaN(parseInt(args[0]))) {
            msg.channel
                .send('a domme hoer je moet cijfer doen')
                .then(botmsg => botmsg.delete({ timeout: 3000 }))
        } else if (!args.length) {
            msg.channel
                .send('zeg hoeveel berichtjes je wilt weg hebben')
                .then(botmsg => botmsg.delete({ timeout: 3000 }))
        } else {
            msg.channel.messages
                .fetch({ limit: parseInt(args[0]) + 1 })
                .then((messages) => msg.channel.bulkDelete(messages))
            msg.channel
                .send(args[0] + ' weg')
                .then(botmsg => botmsg.delete({ timeout: 3000 }))
        }
    }

    if (command === 'amus') {
        const channel = msg.member.voice.channel
        if (channel === null) {
            msg.channel
                .send('je zit niet in channel bro')
                .then(botmsg => botmsg.delete({ timeout: 3000 }))
        } else if (!msg.member.hasPermission('MUTE_MEMBERS')) {
            msg.channel
                .send('mag niet')
                .then(botmsg => botmsg.delete({ timeout: 3000 }))
        } else {
            const channelHasMute = typeof (channel.members.find(member => member.voice.serverMute === false)) === 'undefined'
            channel.members.forEach(member => member.voice.setMute(!channelHasMute))
            msg.channel
                .send('toggle mute')
                .then(botmsg => botmsg.delete({ timeout: 3000 }))
        }
        msg.delete()
    }
})

client.login(token)