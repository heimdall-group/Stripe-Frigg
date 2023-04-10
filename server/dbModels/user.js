import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: String,
    uid: String,
    stocks: Object,
    plan: String,
    number: String,
    dateOfBirth: Number,
    step: String,
    customerID: String,
  },
)
export default mongoose.model("Users", UserSchema);
