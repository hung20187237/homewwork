const mongoose = require('mongoose')

const AccountfbSchema = mongoose.Schema(
 {
    userId:{
        type: String,
        required: true
    },
    accountname:{
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "",
    },
    accountId: {
        type: String,
        required: true
    },

    
    access_token: {
        type: String,
        required: true,
    },
 },
 {timestamps: true})

 module.exports = mongoose.model('accountfb',AccountfbSchema)