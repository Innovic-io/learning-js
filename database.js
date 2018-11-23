const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:3000/database';

MongoClient.connect(url, (err, db) => {
    if(err) {
        throw err;
    }
    db.close;
})