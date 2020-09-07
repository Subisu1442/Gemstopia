const mongoose = require('./mongoose')

const reqString = {
    type: String,
    require: true,
}

const profileSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    coins: {
        type: Number,
        deafult: 0,
    },
    xp: {
        type: Number,
        deafult: 0,
    },
    level: {
        type: Number,
        deafult: 1
    },
})

module.exports = mongoose.module('profiles', profileSchema)