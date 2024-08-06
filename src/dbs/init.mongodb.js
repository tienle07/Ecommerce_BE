'use strict';

const mongoose = require('mongoose');

const connectSting = `mongodb://0.0.0.0:27017/shopDev`
const { countConnect } = require('../helpers/check.connect')

class Database {
    constructor() {
        this.connect()
    }

    // connect
    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true })
        }

        mongoose.connect(connectSting, {
            maxPoolSize: 50
        }).then(_ => console.log(`Connect to MongoDB Successfully`, countConnect()))
            .catch(err => console.error(`Error connecting MongoDB + ${err}`));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb