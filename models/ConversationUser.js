const mongoose = require('mongoose');

const ConversationUserSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    privilege: {
        type: Number,
        required: true
    }
}, {
    collection: 'conversation_user'
});
ConversationUserSchema.index({ user: 1, conversation: 1 }, { unique: true })
module.exports = mongoose.model('Conversation_User', ConversationUserSchema);
