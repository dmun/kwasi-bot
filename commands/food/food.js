const { randomBytes } = require('crypto')
const Discord = require('discord.js')
const { Command } = require('discord.js-commando')
const https = require('https')
const key = process.env.SPOONACULAR_KEY

module.exports = class FoodCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'food',
            group: 'food',
            memberName: 'food',
            description: 'Kwasi shares random recipe(s).',
            args: [
                {
                    key: 'query',
                    prompt: 'Provide a query.',
                    type: 'string',
                    default: 'african'
                }
            ]
        })
    }

    run(msg, { query }) {
        const offset = Math.floor(Math.random() * 990)

        https.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${key}&offset=${offset}`, (resp) => {
            let data = '';

            resp.on('data', chunk => {
                data += chunk
            })

            resp.on('end', _ => {
                const result = JSON.parse(data).results[0]

                try {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(result.title)
                        .setImage(result.image)
                    msg.channel.send(embed)
                } catch {
                    msg.channel.send('Recipe could not be found. 😔')
                }
            })
        })
            .on('error', err => msg.channel.send(`Uh oh! Kwasi's brain is not working!`))
    }
}