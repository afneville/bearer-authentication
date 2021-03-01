const express = require('express');
const User_db = require('../../models/User');
const salt = require('../../config/keys').salt;
const { create_new_token, get_brearer_token, get_object_from_token } = require('../../src/handle_token');
const { new_hash, unhash } = require('../../src/hash');
const router = express.Router();

router.post('/register', async (req, res) => {

    if (req.body.username && req.body.password && req.body.name) {

        data = await new_hash(req.body.password).catch(() => res.sendStatus(500));

        const user = new User_db({

            username: req.body.username,
            name: req.body.name,
            password: data.hashed_password,
            salt: data.salt

        });

        await user.save().catch(() => res.json({ msg: "username already taken." }));
        create_new_token(user.toJSON(), salt).then((token) => res.json({token})).catch(() => res.sendStatus(500));
    
    } else {

        res.sendStatus(400);

    }

});

router.post('/login', async (req, res) => {

    if (req.body.username && req.body.password) {

        user = await User_db.findOne({ username: req.body.username });
        hashed_password = await unhash(req.body.password, user.salt).catch();
        
        if (hashed_password == user.password) {

            create_new_token(user.toJSON(), salt).then((token) => res.json({token})).catch(() => res.sendStatus(500));

        } else {

            res.sendStatus(400);

        }

    } else {

        res.sendStatus(400);

    }

});

router.get('/dev-verify', async (req, res) => {

    token = await get_brearer_token(req.headers['authorization']).catch(() => res.sendStatus(400));
    user = await get_object_from_token(token, salt).catch(() => res.sendStatus(403));
    res.json(user);

});

router.delete('/delete', async (req, res) => {

    token = await get_brearer_token(req.headers['authorization']).catch(() => res.sendStatus(400));
    user = await get_object_from_token(token, salt).catch(() => res.sendStatus(403));
    await User_db.deleteOne({ _id: user._id });
    res.json({ message: "success" });

});

module.exports = router;
