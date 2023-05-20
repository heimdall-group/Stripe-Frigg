import { initializeApp, cert } from "firebase-admin/app";
import mongoose from "mongoose";

initializeApp({
  credential: cert('./cert.json')
})

const config = useRuntimeConfig();

export default async () => {
  try {
    await mongoose.connect(config.mongoUrl);
    ("DB connection true");
  } catch (err) {
    console.error("DB connection false", err);
  }
};