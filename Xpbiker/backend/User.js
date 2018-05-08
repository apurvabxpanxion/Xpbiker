var mongoose = require ('mongoose')

var userSchema = new mongoose.Schema({
    namef: String,
    username: String,
    email: String,
    password: String,
    gender: String,
    tel: String
})

module.exports = mongoose.model('User', userSchema)