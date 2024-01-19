import { checkConnectionSuccessful, createMongoClient } from "../utils/mongo.js";

// Init mongo client
const client = {
  uri: "mongodb://root:example@mongo:27017",
  options: {},
}
const mongo = createMongoClient(client.uri, client.options);
const mongoConnected = checkConnectionSuccessful(mongo).then(() => console.log("MongoDB connection successful."));

export { client, mongo, mongoConnected }