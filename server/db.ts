import mongoose from "mongoose";
import { DB_URL } from "./config";
const dbUrl: string = DB_URL || "";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data: any) => {
      console.log(
        `✅ Mongo Database is connected with ${data.connection.host} `,
      );
    });
  } catch (error) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
