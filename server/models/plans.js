import mongoose from "mongoose";

const PlansSchema = new mongoose.Schema(
  {
    plan_id: Number,
    stripe_plans: Array,
    stripe_currencies: Array,
  }
)
export default mongoose.model("Plans", PlansSchema);
