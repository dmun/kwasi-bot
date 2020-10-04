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
                    key: 'cuisine',
                    prompt: 'Select a cuisine.',
                    type: 'string',
                    default: 'african'
                }
            ]
        })
    }

    run(msg, { cuisine } ) {
        https.get(`https://api.spoonacular.com/recipes/random?limitLicense=true&tags=${cuisine}&number=1&apiKey=${key}`, (resp) => {
            let data = '';

            resp.on('data', chunk => {
                data += chunk
            })

            resp.on('end', _ => {
                const recipe = JSON.parse(data).recipes[0]
                try {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(recipe.title)
                        .setURL(recipe.sourceUrl)
                        .setImage(recipe.image)
                    msg.channel.send(embed)
                } catch {
                    msg.channel.send('Recipe could not be found. 😔')
                }
            })
        })
        .on('error', err => msg.channel.send(`Uh oh! Kwasi's brain is not working!`))
    }
}