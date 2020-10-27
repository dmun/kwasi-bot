const { sign } = require('crypto');
const Discord = require('discord.js');
const { Command } = require('discord.js-commando')
const https = require('https')
const key = process.env.NASA_KEY

module.exports = class NasaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nasa',
            group: 'misc',
            memberName: 'nasa',
            description: 'Nasa'
        })
    }

    run(msg) {
        https.get(`https://api.nasa.gov/planetary/apod?api_key=${key}`, resp => {
            let data = '';

            resp.on('data', chunk => {
                data += chunk
            })

            resp.on('end', _ => {
                const result = JSON.parse(data)

                try {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(result.title)
                        .setImage(result.url)
                        .setDescription(result.explanation)
                    console.log(result)
                    msg.channel.send(embed)
                } catch {
                    msg.channel.send('Uh oh Nasa command went fout! 😔')
                }
            })
        })
    }
}