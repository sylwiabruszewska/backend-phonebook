import mongoose from "mongoose";

const { DB_HOST: uriDb } = process.env;

const connection = mongoose.connect(uriDb);

export const connectToMongoDB = async () => {
  try {
    await connection;
    console.log("Database connection successful");
  } catch (err) {
    console.log("Database connection failed, shutting down");
    console.error(err);
    process.exit(1);
  }
};
