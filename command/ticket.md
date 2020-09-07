const channelId = ''
const check = ''

module.exports = {
    commands: ['ticket', 'support'],
    minArgs: 1,
    expectedArgs: '<message>',
    callback: (Message, arguments, text) => {
        const { guild, member } = Message

        const channel = guild.channels.cache.get(channeId)
        channel.send(`New Ticket has been create by <@${member.id}>
        "${text}"
        
        Click the ${check} icon when this Problem has been resolved.`)
        .then(message => {
            message.react(check)
        })
        
    }
}