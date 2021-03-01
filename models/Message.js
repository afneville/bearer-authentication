const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    attachments: {
        type: Boolean
    }
},{
    collection: 'message'
});
module.exports = mongoose.model('Message', MessageSchema);
