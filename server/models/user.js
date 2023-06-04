import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    user_uid: String,
    user_email: String,
    user_number: String,
    user_ranks: Array,
    register_step: String,
    stripe_plan: Object,
    stripe_plan_name: String,
    stripe_status: String,
    stripe_expired: Boolean,
    stripe_customerID: String,
  },
)
export default mongoose.model("Users", UserSchema);
