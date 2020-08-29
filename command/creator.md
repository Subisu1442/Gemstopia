const { Message } = require("discord.js")

module.exports = {
    name: 'ping',
    description: 'Ping Command',
    guildOnly: true,
    execute(nessage, args) {
        Message.channel.send(`pong ${message.guildOnly}`)
    }
}