import mongoose from "mongoose";

const UnsortedCustomerIDsSchema = new mongoose.Schema(
  {
    stripe_plan: Object,
    stripe_customerID: String,
  },
);

const UnsortedCustomerIDs = mongoose.model("UnsortedCustomerIDs", UnsortedCustomerIDsSchema);


export { UnsortedCustomerIDs }
