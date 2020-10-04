const Discord = require('discord.js')
const { Command } = require('discord.js-commando')
const https = require('https')
const key = process.env.SPOONACULAR_KEY

module.exports = class ChatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'chat',
            group: 'food',
            memberName: 'chat',
            description: 'Chat with Kwasi!',
            args: [
                {
                    key: 'message',
                    prompt: 'Provide a message.',
                    type: 'string',
                    default: 'african'
                }
            ]
        })
    }

    run(msg, { message } ) {
        https.get(`https://api.spoonacular.com/food/converse?text=${message}&apiKey=${key}`, (resp) => {
            let data = ''

            resp.on('data', chunk => {
                data += chunk
            })

            resp.on('end', _ => {
                const answer = JSON.parse(data).answerText
                try {
                    msg.channel.send(answer)
                } catch {
                    msg.channel.send('Kwasi is dead. 😔')
                }
            })
        }).on('error', err => msg.channel.send(`Uh oh! Kwasi's brain is not working!`))
    }
}