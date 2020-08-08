const { Command } = require('discord.js-commando')

module.exports = class ClearCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            aliases: ['cl'],
            group: 'general',
            memberName: 'clear',
            description: 'Removes messages.',
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'amount',
                    prompt: 'Pass the amount of messages you want to remove.',
                    type: 'integer'
                }
            ]
        })
    }

    run(msg, { amount }) {
        msg.channel.messages
            .fetch({ limit: amount + 1 })
            .then(messages => msg.channel.bulkDelete(messages))
        msg.channel
            .send(args[0] + ' weg')
            .then(botmsg => botmsg.delete({ timeout: 3000 }))
    }
}