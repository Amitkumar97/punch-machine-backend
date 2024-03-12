import mongoose from "mongoose";

const {
  DB_SERVER,
  DB_NAME,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

const dbUri = DB_USERNAME && DB_PASSWORD
  ? `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_SERVER}:${DB_PORT}/${DB_NAME}`
  : `mongodb://${DB_SERVER}:${DB_PORT}/${DB_NAME}`;

let connection;

try {
  await mongoose.connect(dbUri);
  console.log("Database connected");
  connection = true;
} catch (error) {
  connection = false;
}

export default connection;
