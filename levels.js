const mongo = require('mongo')
const profileSchema = require('./schemas/profile-schemas')

module.exports = (client) => {
    client.on('message', message => {
        const { guild, member } = message

        addXP(guild.id, member.id, 23)
    })
}

const addXP = async (guildId, userId, xpToAdd) => {
    await mongo().then(async mongoose => {
        try {
            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId
            }, {
                guildId,
                userId,
                $inc: {
                    xp: xpToAdd 
                }
            }, {
                upsert: true
            })

            console.log('RESULT:', result)
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.addXP = addXP