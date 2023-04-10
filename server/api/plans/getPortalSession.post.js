import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import Users from '~/server/dbModels/user';

const stripe = new Stripe(useRuntimeConfig().stripe_secret);

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);
  const res = await getAuth().verifyIdToken(token);
  try {
    if (res) {
      const { customerID } = await Users.findOne({uid: res.uid});
      const { url } = await stripe.billingPortal.sessions.create({
        customer: customerID,
        return_url: `${useRuntimeConfig().domain_url}`,
      });

      return url;
    } else {
      return 'user not authenticated'
    }
  } catch (err) {
    return err
  }
  
});
