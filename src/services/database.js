const mongoDB = require('mongodb');

module.exports.connect = async (databaseName, collection) => {
    const database = await mongoDB.MongoClient
        .connect(`mongodb://localhost/${databaseName}`, { useNewUrlParser: true });
        return database.db('pets').collection(collection);
};