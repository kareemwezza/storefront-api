import { Pool } from "pg";
import config from "../config";

const client = new Pool({
  host: config.host,
  port: parseInt(config.dbPort as string),
  database: config.db,
  user: config.username,
  password: config.password,
  max: 4,
});

client.on("error", (err) => {
  console.error("Database error occured", err);
});

export default client;
