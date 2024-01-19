/* expressGetRoutes.js */
import { Router } from "express";
import { mongo } from "../services/mongo.js";
import { fetchCollections, fetchDatabases } from "../utils/mongo.js";

const router = Router();

const getResult = (data, message, route) => ({
  "data": data,
  "message": message,
  "route": route,
  "timestamp": Date.now()
});

const getDatabases = async () => {
  const databases = await fetchDatabases(mongo, "admin");
  return databases;
}

const getCollections = async () => {
  const collections = await fetchCollections(mongo, "admin");
  return collections;
}

const results = {
  default: getResult(null, "Hello, from the default Express route!", "/"),
  databases: getResult(getDatabases(), "Databases here", "/databases"),
  collections: getResult(getCollections(), "admin", "Collections here", "/collections")
}

export default function expressGetRoutes(app){
  app.get("/", (req, res) => res.send(results.default));
  app.get("/databases", (req, res) => res.send(results.databases));
  app.get("/collections", (req, res) => res.send(results.collections));
}