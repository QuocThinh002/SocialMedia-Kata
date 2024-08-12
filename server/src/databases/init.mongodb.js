const mongoose = require('mongoose')

const connectString = `mongodb://127.0.0.1:27017/socialMediaKata`

class Database {
    constructor() {
        this.connect()
    }

    connect() {
        if (1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', {color: true})
        }

        mongoose.connect(connectString).then(_ => console.log(`Connected Mongodb Success!!!`))
        .catch( err => console.log(`Error connect!!!`))
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb

