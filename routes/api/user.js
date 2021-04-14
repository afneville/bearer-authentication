const express = require('express');
const User_db = require('../../models/User');
const salt = require('../../config/keys').salt;
const { User } = require('../../src/classes');
const { create_new_token, get_brearer_token, get_user_from_token } = require('../../src/handle_token');
const { new_hash, unhash } = require('../../src/hash');
const { authenticate } = require('../../src/authenticate');

// Create an express router to handle routes
const router = express.Router();

// Create a new user and put info in the db and issue a web token
router.post('/register', async (req, res) => {

    if (req.body.username && req.body.password && req.body.name) {

        data = await new_hash(req.body.password).catch(() => res.sendStatus(500));

        const user = new User_db({

            username: req.body.username,
            name: req.body.name,
            password: data.hashed_password,
            salt: data.salt

        });

        await user.save().then(() => {

            create_new_token(user.toJSON(), salt).then((token) => res.json({ token })).catch(() => res.sendStatus(500));

        }).catch(() => {

            return res.status(400).json({ msg: "username already taken" });

        })

    } else {

        res.sendStatus(400);

    }

});

// Issue a web token to a client passing valid credentials in request body
router.post('/login', async (req, res) => {

    if (req.body.username && req.body.password) {

        user = await User_db.findOne({ username: req.body.username });
        hashed_password = await unhash(req.body.password, user.salt).catch();

        if (hashed_password == user.password) {

            create_new_token(user.toJSON(), salt).then((token) => res.json({ token })).catch(() => res.sendStatus(500));

        } else {

            res.sendStatus(400);

        }

    } else {

        res.sendStatus(400);

    }

});

// Use middleware to identify the user associated with incoming request
router.get('/dev-verify', authenticate, async (req, res) => {

    // Middleware puts the id in 'res.locals'
    let user = new User(res.locals.id);
    let user_data = await user.return_info();
    res.json(user_data);


});

// Delete the account of a client making valid, authenticated delete request
router.delete('/delete', authenticate, async (req, res) => {

    let user = new User(res.locals.id);
    await User_db.deleteOne({ _id: user._id });
    res.json({ message: "success" });

});

module.exports = router;
