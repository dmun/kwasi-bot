const { Command } = require('discord.js-commando')

module.exports = class MuteChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'mutechannel',
            aliases: ['mc', 'amus'],
            group: 'misc',
            memberName: 'mutechannel',
            description: 'Mutes everyone in the current channel.',
            userPermissions: ['MUTE_MEMBERS']
        })
    }
    
    run(msg) {
        const channel = msg.member.voice.channel
        if (channel === null) {
            msg.channel
                .send('je zit niet in channel bro')
        } else {
            const channelHasMute = typeof channel.members.find( (member) => member.voice.serverMute === true) !== 'undefined'
            channel.members.forEach(member => member.voice.setMute(!channelHasMute))
            msg.delete({ timeout: 3000 })
            msg.channel
                .send('toggle mute')
                .then((botmsg) => botmsg.delete({ timeout: 3000 }))
        }
    }
}
