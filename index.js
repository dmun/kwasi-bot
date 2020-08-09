var prefix = '-'

require('dotenv').config()
const token = process.env.TOKEN
const Discord = require('discord.js')
const { CommandoClient } = require('discord.js-commando')
const path = require('path')

const client = new CommandoClient({
    commandPrefix: '-',
    owner: '157063395969990656',
    unknownCommandResponse: false
})

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['general', 'General commands'],
        ['misc', 'Miscellaneous commands']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'))

client.on('ready', () => {
    console.log(`Connected as ${client.user.tag}`)
    client.user.setPresence({
        activity: {
            name: 'IntelliJ IDEA',
        },
        status: 'available',
    })
})

client.on('error', console.error)

client.login(token)