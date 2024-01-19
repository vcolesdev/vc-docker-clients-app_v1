import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import promiseMiddleware from "../middleware/promise.js";

// Init Express app
const app = new express();

// Init middleware
app.use(cors({origin: "*"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(promiseMiddleware());

// Export app
export default app;