const User_db = require('../models/User');

// Abstraction layer ontop of mongoose, useful should the database ever need to be changed
class User {

    constructor(id) {

        this.id = id;

    }

    async return_info() {

        return new Promise(async (resolve, reject) => {

            let user_data = await User_db.findOne({ user: this.id }).catch(() => reject());
            resolve(user_data);

        });

    }

};

module.exports = { User };
