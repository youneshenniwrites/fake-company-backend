import mongoose from "mongoose";

export const connectToDatabase = () => {
  const establishConnection = () => {
    mongoose
      .connect("mongodb://127.0.0.1:27017/fakecompany-backend")
      .then(() => console.log("Successfully connected to database"))
      .catch((error) => {
        console.log("Error connecting to database", error);
        return process.exit(1);
      });
  };
  establishConnection();

  mongoose.connection.on("disconnected", establishConnection);
};
