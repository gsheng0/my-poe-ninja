import { MongoClient, Db } from 'mongodb';


interface MongoConfig {
    serverUrl: string;
    database: string;
}

const mongoConfig: MongoConfig = {
    serverUrl: 'mongodb://localhost:27017/',
    database: 'my-poe-ninja'
};

let _connection: MongoClient | undefined = undefined;
let _db: Db | undefined = undefined;

export const dbConnection = async (): Promise<Db> => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl);
    _db = _connection.db(mongoConfig.database);
  }

  return _db!;
};

export const closeConnection = async (): Promise<void> => {
  if (_connection) {
    await _connection.close();
    _connection = undefined;
    _db = undefined;
  }
};
