import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGO_URI}`
    );
    console.log(
      `\n MongoDb Connected !! DB Host: ${connection.connection.host}`
    );
  } catch (error) {
    console.error("MONGODB Connection Error: ", error);
    process.exit(1);
  }
};

export default connectDB;
