import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import Users from '~/server/models/user';

const stripe = new Stripe(useRuntimeConfig().stripe_secret);

export default defineEventHandler(async (event) => {
  const { token, return_url } = await readBody(event);
  const result = await getAuth().verifyIdToken(token);
  try {
    if (result) {
      const { stripe_customerID } = await Users.findOne({user_uid: result.uid});
      const { url } = await stripe.billingPortal.sessions.create({
        customer: stripe_customerID,
        return_url: return_url,
      });

      return {
        data: url,
        success: true,
      }
    } else {
      return {
        data: false,
        success: false,
        message: 'User not authenticated',
        code: 400,
      }
    }
  } catch (err) {
    console.log(err)
    return {
      data: false,
      success: false,
      message: 'Catch Error',
      code: 400,
    }
  }
  
});
