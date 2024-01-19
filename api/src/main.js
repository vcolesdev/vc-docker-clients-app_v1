import expressGetRoutes from "./routes/index.js";
import app from "./services/express.js";
import { listen } from "./utils/index.js";
import { mongoConnected } from "./services/mongo.js";

/**
 * Main function
 * This main function is called from api/index.js and bootstraps the application.
 * @returns {Promise<void>}
 */
export default async function main() {
  try {
    await listen(app,8080);
    await expressGetRoutes(app);
    await mongoConnected;
  } catch (err) {
    console.error(`Error dispatched from main function in main.js: ${err}`);
  } finally {
    console.log("Main function init successfully.");
  }
}
