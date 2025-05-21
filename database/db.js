/* eslint-disable no-undef */
import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to the database");
  } catch (error) {
    console.log(`Error connecting to the database, error: ${error.message}.`);
    process.exit(1);
  }
};

export default connectToDB;
