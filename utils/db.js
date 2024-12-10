import mongodb from 'mongodb';
// eslint-disable-next-line no-unused-vars
import Collection from 'mongodb/lib/collection';

/**
 * Represents a MongoDB client.
 */
class DBClient {
  /**
   * Creates a new DBClient instance.
   */
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const URL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(URL, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client.connect().then(() => {
      this.db = this.client.db(`${database}`);
    }).catch((err) => {
      console.log(err);
    });
  }

  /**
   * Checks if client's connection to the MongoDB server is active.
   * @returns {boolean}
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Retrieves the number of users in the database.
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  /**
   * Retrieves the number of files in the database.
   * @returns {Promise<Number>}
   */
  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }

  /**
   * Retrieves a reference to the users collection.
   * @returns {Promise<Collection>}
   */
  async usersCollection() {
    return this.db.collection('users');
  }

  /**
   * Retrieves a reference to the files collection.
   * @returns {Promise<Collection>}
   */
  async filesCollection() {
    return this.db.collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
