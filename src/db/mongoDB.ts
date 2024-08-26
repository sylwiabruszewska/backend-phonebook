import mongoose from "mongoose";

const uriDb = process.env.DB_HOST as string;

if (!uriDb) {
  throw new Error("Database connection string (DB_HOST) is not defined");
}

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
