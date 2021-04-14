const jwt = require('jsonwebtoken');

// These functions are used to handle the token on the server side

// Used to create a new token when credentials are passed.
function create_new_token(user, salt) {

    return new Promise((resolve, reject) => {

        jwt.sign(user, String(salt), (err, token) => {

            if (err) {

                reject(err);

            } else {

                resolve(token);
            }
        
        });

    });

}

// Retrieve a token from a string
function get_brearer_token(string) {

    return new Promise((resolve, reject) => {

        if (string == undefined) {

            reject();

        } else {

            const token = string.split(' ')[1];
            resolve(token);

        }

    });
}

// Deobfuscate the token into the initial data.
function get_user_from_token(token, salt) {

    return new Promise((resolve, reject) => {

        jwt.verify(token, salt, (err, data) => {

            if (err) {

                reject();

            } else {

                resolve(data);

            }

        });

    });
}

module.exports = { create_new_token, get_brearer_token, get_user_from_token };
