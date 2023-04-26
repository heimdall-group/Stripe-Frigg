import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    user_username: String,
    user_uid: String,
    user_stocks: Object,
    user_number: String,
    user_date: Number,
    register_step: String,
    user_ranks: Array,
    stripe_plan: Object,
    stripe_plan_name: String,
    stripe_status: String,
    stripe_expired: Boolean,
    stripe_customerID: String,
  },
);

const Users = mongoose.model("Users", UserSchema);


export { Users }
