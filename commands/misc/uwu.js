const { Command } = require('discord.js-commando');

module.exports = class UwuCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'uwu',
            group: 'misc',
            memberName: 'uwu',
            description: 'Kuwasi-san tawks fow you~~',
            args: [
                {
                    key: 'text',
                    prompt: 'Pwovide sum txet',
                    type: 'string'
                }
            ]
        });
    }

    run(msg, { text }) {
        text = text.replace(/r/gi, 'w').concat('~~~');
        msg.channel.send(text);
    }
};
