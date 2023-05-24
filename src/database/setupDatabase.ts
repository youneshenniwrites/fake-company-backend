import mongoose from "mongoose";
import { config } from "../config";

export const connectToDatabase = () => {
  const establishConnection = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => console.log("Successfully connected to database"))
      .catch((error) => {
        console.log("Error connecting to database", error);
        return process.exit(1);
      });
  };
  establishConnection();

  mongoose.connection.on("disconnected", establishConnection);
};
