const { fileLoader } = require('ejs')
const mongoose = require('mongoose')

const allRecords = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    fname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        
    },
    classn: {
        type: String,
        require: true,
    },
    roll: {
        type: Number,
        require: true,
    },
    dob: {
        type: String,
        require: true,
    },
    gen: {
        type: String,
        require: true,
    },
    blood: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    add: {
        type: String,
        require: true,
    },
})

const record = mongoose.model('record', allRecords)
module.exports = record