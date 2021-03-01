const express = require('express');
const router = express.Router();
const salt = require('../../config/keys').salt;
const { create_new_token, get_brearer_token, get_object_from_token } = require('../../src/handle_token');
const { User, Message, Conversation, Attachment } = require('../../src/classes');

router.post('/create', async (req, res) => {


    if (req.body.name && req.body.pin) {

        let token = await get_brearer_token(req.headers['authorization']).catch(() => res.sendStatus(400));
        let user_data = await get_object_from_token(token, salt).catch(() => res.sendStatus(403));
        let user = new User(user_data._id);
        let conversation = await user.create_conversation(req.body.name, req.body.pin).catch(() => res.sendStatus(500));
        res.json(conversation);

    } else {

        res.sendStatus(400);

    }
    
});

router.post('/join', async (req, res) => {

    if (req.body.code && req.body.pin) {

        let token = await get_brearer_token(req.headers['authorization']).catch(() => res.sendStatus(400));
        let user_data = await get_object_from_token(token, salt).catch(() => res.sendStatus(403));
        let user = new User(user_data._id);
        let conversation = await user.join_conversation(req.body.code, req.body.pin).ctach(() => res.sendStatus(403));
        res.json(conversation);
        

    } else {

        res.sendStatus(400);

    }

});

router.get('/list', async (req, res) => {

    let token = await get_brearer_token(req.headers['authorization']).catch(() => res.sendStatus(400));
    let user_data = await get_object_from_token(token, salt).catch(() => res.sendStatus(403));
    let user = new User(user_data._id);
    let conversations = await user.list().catch(() => res.sendStatus(500));
    res.json(conversations);

    

});

module.exports = router;
