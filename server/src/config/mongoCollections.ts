// Import necessary modules
import { Db, Collection, Document } from 'mongodb';
import { dbConnection } from './mongoConnection';
import { TradeData, User } from '../typedef/typedef'; // Ensure the path is correct

// Generic function to get a collection
const getCollectionFn = (collection: string): () => Promise<Collection<Document>> => {
  let _col: Collection<Document> | undefined = undefined;

  return async (): Promise<Collection<Document>> => {
    if (!_col) {
      const db: Db = await dbConnection(); // Ensure dbConnection is correctly typed and imported
      _col = db.collection(collection);
    }

    return _col;
  };
};

// Export specific collections
export const getUsers = getCollectionFn('users');
export const getData = getCollectionFn('data');
