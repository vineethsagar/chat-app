const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: String,
    user: String,
    likes: Number
});

module.exports = mongoose.model('Message', messageSchema);
