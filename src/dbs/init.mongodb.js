const mongoose = require('mongoose');
const { db: { host, name, port } } = require('../configs/config.mongodb')
const connectString = `mongodb://${host}:${port}/${name}`
const { countConnect } = require('../helpers/check.connect')

console.log(connectString);

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

        mongoose.connect(connectString, {
            maxPoolSize: 50
        }).then(_ => console.log(`Connect to MongoDB Successfully`))
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