import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import Users from '~/server/dbModels/user';
import { UnsortedCustomerIDs } from '~/server/dbModels/unsortedCustomerIDs';

const stripe = new Stripe(useRuntimeConfig().stripe_secret);

export default defineEventHandler(async (event) => {
  const { sessionID, token } = await readBody(event);
  const res = await getAuth().verifyIdToken(token);
  try {
    if (res) {
      const { customer } = await stripe.checkout.sessions.retrieve(sessionID);
      const UnsortedCustomerID = await UnsortedCustomerIDs.findOne({stripe_customerID: customer});
      if (UnsortedCustomerID) {
        const User = await Users.findOneAndUpdate({user_uid: res.uid}, {stripe_customerID: customer, stripe_plan: UnsortedCustomerID.stripe_plan})
        UnsortedCustomerID.deleteOne();
        User.save();
      } else {
        const User = await Users.findOneAndUpdate({user_uid: res.uid}, {stripe_customerID: customer})
        User.save();
      }


      UnsortedCustomerID.save();
      return true;
    } else {
      return 'user not authenticated'
    }
  } catch (err) {
    return err
  }
  
});
