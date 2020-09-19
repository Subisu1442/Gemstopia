const { DiscordAPIError } = require('discord.js')
const Embed = require('./discord.js')

module.exports = async (bot, message, args) => {
    let logchannel = message.guild.channel.cache.find(ch => ch.name === "report")
    if(!logchannel) return message.channel.send("Couldnt find the channel")

    let user = message.mention.member.first()
    if(!user) return message.channel.send("I Cant find that user")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "No reason specifind"

    let banembed = new discord.MessageEmbed()
    .setTitle(user.user.tag)
    .setField("User Has been banned", `${user}`)
    .setField("Moderator:", message.author)
    .setField("Reason:", reason)

    try{
        await user.send("You have been banned from " + message.guild.name + "Modeator: "
         + message.author + "Reason: " + reason)
    } catch(err) {
  console.log(err)  
}
await user.ban()
message.channel.send(`${user} has been banned for ` + reason)

logchannel.send(banembed)
}