import dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  PEPPER,
  SALT_ROUNDS,
  TOKEN_SECRET,
} = process.env;

export default {
  port: PORT,
  host: POSTGRES_HOST,
  db: NODE_ENV === "dev" ? POSTGRES_DB : POSTGRES_DB_TEST,
  dbPort: POSTGRES_PORT,
  username: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  hash: PEPPER,
  salt: SALT_ROUNDS,
  tokenSecret: TOKEN_SECRET,
};
