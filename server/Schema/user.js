const mongoose = require('mongoose')

const { Schema } = mongoose

const session = new Schema({
    session_topic: String,
    session_start: String,
    session_end: String,
    session_link: String
})

const userSchema = new Schema({
    name: String,// this field is just for sample, as i am not using auth. Each user will have their own name and sessions.
    sessions: [session]
})

const User = mongoose.models['user'] || mongoose.model('user', userSchema)

module.exports = { User }