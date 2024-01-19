import { MongoClient } from "mongodb";
import {
  handleMsgDbConnectionError,
  handleMsgDbConnectionClosed,
  handleMsgMongoUriError,
  handleMsgDbConnectionEstablished,
  handleMsgDbPingStatusOK
} from "./messages.js";

const connectToMongoCB = async (client, db = "admin", cb = () => {}) => {
  try {
    // Check connection
    console.log(handleMsgDbConnectionEstablished(db));
    await client.connect();
    await cb();
  } catch (err) {
    console.error(handleMsgDbConnectionError(db, err));
  } finally {
    // See: https://stackoverflow.com/questions/72155712/mongoruntimeerror-connection-pool-closed
    setTimeout(() => {
      client.close();
    }, 1500);
    console.log(handleMsgDbConnectionClosed(db));
  }
}

/**
 * Create a new MongoDB client
 * @link https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/#create-a-mongoclient
 * @param uri
 * @param options
 * @returns {MongoClient}
 */
const createMongoClient = (uri = "", options = {}) => {
  if (!uri) throw new Error(handleMsgMongoUriError());
  return new MongoClient(uri, {...options});
}

/**
 * Connect to the MongoDB database and check for OK status
 * @link https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/#connect-to-mongodb
 * @param client
 * @param db
 * @returns {Promise<void>}
 */
const checkConnectionSuccessful = async (client, db = "admin") => {
  await connectToMongoCB(client, db, async () => {
    client.db(db).command({ ping: 1 });
    console.log(handleMsgDbPingStatusOK());
  });
}

/**
 * Fetch databases from MongoDB
 * @param client
 * @param db
 * @returns {Promise<ListDatabasesResult>}
 */
const fetchDatabases = async (client, db = "admin") => {
  let databases;
  await connectToMongoCB(client, db, async () => {
    databases = await client.db(db).admin().listDatabases();
    console.log("Databases: ", databases);
  });
  return databases;
}

/**
 * Fetch collections from MongoDB
 * @param client
 * @param db
 * @returns {Promise<void>}
 */
const fetchCollections = async (client, db = "admin") => {
  let collections;
  await connectToMongoCB(client, db, async () => {
    collections = await client.db(db).listCollections().toArray();
    console.log("Collections: ", collections);
  });
  return collections;
}

export { checkConnectionSuccessful, createMongoClient, fetchDatabases, fetchCollections }