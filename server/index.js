import mongoose from "mongoose";

const config = useRuntimeConfig();

export default async () => {
  try {
    await mongoose.connect(config.mongoUrl);
    console.log("DB connection true");
  } catch (err) {
    console.error("DB connection false", err);
  }
};