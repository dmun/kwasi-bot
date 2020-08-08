const { Command } = require('discord.js-commando')

module.exports = class KwasiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kwasi',
            aliases: ['kw'],
            group: 'misc',
            memberName: 'kwasi',
            description: 'Kwasi introduces himself!'
        })
    }

    run(msg) {
        return msg.reply('hallo ik ben kwasi?')
    }
}