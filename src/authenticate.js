const { create_new_token, get_brearer_token, get_user_from_token } = require('./handle_token');
const salt = require('../config/keys').salt;
const express = require('express');

// middleware function for authenticating a user
async function authenticate(req, res, next) {

    let token = await get_brearer_token(req.headers['authorization']).catch(() => {

        res.sendStatus(400);
        next('route');

    });

    let user_data = await get_user_from_token(token, salt).catch(() => {

        res.sendStatus(400);
        next('route');

    });

    res.locals.id = user_data.id;
    next()

}

module.exports = { authenticate };
