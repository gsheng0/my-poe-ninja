const { MongoClient } = require('mongodb');
const { mongoConfig } = require('./settings.js');

let _connection = undefined;
let _db = undefined;

const dbConnection = async () => {
  if (!_connection) {
    console.log(mongoConfig);
    _connection = await MongoClient.connect(mongoConfig.serverUrl);
    _db = _connection.db(mongoConfig.database);
  }

  return _db;
};

const closeConnection = async () => {
  await _connection.close();
};

module.exports = { dbConnection, closeConnection };