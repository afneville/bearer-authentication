const mongoose = require('mongoose');

const ConversationSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    
    join_code: {
        type: Number,
        required: true,
        unique: true
    },

    pin: {
        type: String
    }

}, {
    collection: 'conversation'
});


module.exports = mongoose.model('Conversation', ConversationSchema);
