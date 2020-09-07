const mongose = require('./mongoose')

const reqString = {
    type: String,
    require: true,
}

const profileSchema = mongose.Schema({
    guildId: reqString,
    userId: reqString,
    coins: {
        type: Number,
        deafuld: 0,
    },
    xp: {
        type: Number,
        deafuld: 0,
    },
    xp: {
        type: Number,
        deafuld: 0,
    },
})

module.exports = mongoose.module('profiles', profileSchema)