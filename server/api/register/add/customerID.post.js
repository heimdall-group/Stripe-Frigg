import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import Users from '~/server/models/user';

const stripe = new Stripe(useRuntimeConfig().stripe_secret);

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);
  const result = await getAuth().verifyIdToken(token);
  try {
    if (result) {
      const customer = await stripe.customers.create({
        email: result.email,
      });
      const document = await Users.findOneAndUpdate({user_uid: result.uid}, {stripe_customerID: customer.id})
      document.save();
      return {
        data: true,
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
    return err
  }
  
});
