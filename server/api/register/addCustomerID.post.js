import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import Users from '~/server/dbModels/user';

const stripe = new Stripe(useRuntimeConfig().stripe_secret);

export default defineEventHandler(async (event) => {
  const { sessionID, token } = await readBody(event);
  const res = await getAuth().verifyIdToken(token);
  try {
    if (res) {
      const { customer } = await stripe.checkout.sessions.retrieve(sessionID);
      const document = await Users.findOneAndUpdate({uid: res.uid}, {stripe_customerID: customer})
      document.save()
      if (document.customerID === customer) {
        return true;
      }
      return false
    } else {
      return 'user not authenticated'
    }
  } catch (err) {
    return err
  }
  
});
