const Conversation_User = require('../models/ConversationUser');


async function find_permission(user_id, conversation_id) {

    return new Promise((resolve, reject) => {
        
        const conversation_user = await Conversation_User.findOne({ user: user_id, conversation: conversation_id}).catch(() => resolve(0));
        resolve(conversation_user.privilege);

    });
}
