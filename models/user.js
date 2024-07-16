const mongoose = require('mongoose')

const user = new mongoose.Schema({
    id: String,

    ip: { type: String, default: '' },
    data: { type: Object, default: {} },
})

module.exports = mongoose.model('user', user)