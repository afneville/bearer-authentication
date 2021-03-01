const mongoose = require("mongoose");
const Conversation_User_db = require('../models/ConversationUser');
const Conversation_db = require('../models/Conversation');
const User_db = require('../models/User');
const Message_db = require('../models/Message');
const Attachment_db = require('../models/Attachment');

class User {

    constructor(id) {
        this.id = id;
    }

    async create_conversation(name, pin) {

        return new Promise( async (resolve, reject) => {

            let processing = true;
            while (processing) {

                const code = Math.floor((Math.random() * 100000) + 1);
                const new_conversation = new Conversation_db({

                    name: name,
                    join_code: code,
                    pin: pin
                    
                });

                const conversation = await new_conversation.save().catch(() => {

                    console.log("code generated is not unique.");
                    console.log("regenerating code...");

                });
                //res.json({ msg: "success", conversation });
                const conversation_user = new Conversation_User_db({

                    user: this.id,
                    conversation: conversation._id,
                    privilege: 3

                });
                await conversation_user.save().catch(() => {
                    reject("Server Error");
                });

                processing = false;
                resolve(conversation);

            }


        });

    }

    async join_conversation(code, pin) {

        return new Promise( async (resolve, reject) => {

            conversation = await Conversation_db.findOne({ join_code: code }).catch(() => reject());
            
            if (conversation.pin == pin) {

                const conversation_user = new Conversation_User_db({

                    user: this.id,
                    conversation: conversation._id,
                    privilege: 1

                });

                await conversation_user.save().catch(() => reject());

                resolve(conversation);

            } else {

                reject();
            }

        });

    }

    async list() {

        return new Promise ( async (resolve, reject) => {

            conversation_users = await Conversation_User_db.find({ user: this.id }).catch(() => reject());
            conversation_ids = [];
            conversation_users.forEach((object) => {
                conversation_ids.push(object.conversation);
            });
            conversations = await Conversation_db.find({ _id: { $in: conversation_ids }}).catch(() => reject());
            resolve(conversations);

        });



    }

    async get_permission(conversation_id) {

        return new Promise( async (resolve, reject) => {
            
            const conversation_user = await Conversation_User_db.findOne({ user: this.id, conversation: conversation_id}).catch(() => reject());
            resolve(conversation_user.privilege);

        });

    }
    async post_message(conversation_id, content) {}
    async delete_message(message_id) {}
    async promote_user(conversation_id, user_id) {}
    async demote_user(conversation_id, user_id) {}



};
class Message {
    constructor(id) {
        this.id = id;
    }
};
class Conversation {

    constructor(id) {
        this.id = id;
    }

};
class Attachment {

    constructor(id) {
        this.id = id;
    }

};

module.exports = {User, Message, Conversation, Attachment};
