import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: String,
    uid: String,
    stocks: Object
  },
)
export default mongoose.model("Users", UserSchema);
